const axios = require("axios");
const dotenv = require("dotenv").config();
const fs = require("fs").promises;

const baseUrl = "https://agenda.brussels";
const api_url = "https://api.brussels:443/api/agenda/0.0.1/";
const countryCode = "BE";

function setIgnored(api_event) {
  let is_ignored = false;

  if (!(api_event.categories.main) && !(api_event.categories.others)) {
    is_ignored = true;
  }
  if (!(api_event.media)) {
    is_ignored = true;
  }
  if (!(api_event.translations.en.longdescr) && !(api_event.translations.en.longdescr)) {
    is_ignored = true;
  }
  if (!(api_event.dates)) {
    is_ignored = true;
  }
  return is_ignored;
}

function createTagsArray(event_categories) {
  const tags = [];
  tags.push({ name: event_categories.main.translations.fr });
  if (event_categories.others !== null) {
    const other_tags = event_categories.others.translations.fr;
    if (Array.isArray(other_tags)) {
      other_tags.forEach((tag) => {
        tags.push({ name: tag });
      });
    } else {
      tags.push({ name: other_tags });
    }
  }
  return tags;
}

function createMediasPhotosArray(event_medias) {
  let mediasPhotos = [];
  if (event_medias) {
    if (Array.isArray(event_medias)){
      event_medias.forEach((photo) => {
        mediasPhotos.push({ link: photo.link});
      });
    } else {
      mediasPhotos.push({ link: event_medias.link});
    }
  }
  return mediasPhotos;
}

function createDateArrays(event_dates) {
  let singleDate = [];
  let calendar = [];
  if (event_dates){
    if (event_dates.length === 1){
      singleDate.push(
        {
          startDate: event_dates[0].day,
          endDate: event_dates[0].day,
          startTime: event_dates[0].start,
          endTime: event_dates[0].end
        }
      )
    } else if (event_dates.length > 1){
      event_dates.forEach((date) => {
        calendar.push(
          {
            startDate: date.day,
            endDate: date.day,
            startTime: date.start,
            endTime: date.end
          }
        )
      });
    }
  }
  return {singleDate, calendar};
}

function createDescriptionsArray(event_descriptions) {
  let descriptions = [];

  if (event_descriptions.fr) {
    if (event_descriptions.fr.shortdescr !== null) {
      descriptions.push(
        { description: event_descriptions.fr.shortdescr }
      );
    }
    if (event_descriptions.fr.longdescr !== null) {
      descriptions.push(
        { description: event_descriptions.fr.longdescr }
      );
    }
  }
  return descriptions;
}

function createPricesArray(event_prices) {
  let prices = [];

  if (event_prices) {
    if (Array.isArray(event_prices)) {
      event_prices.forEach((price) => {
        prices.push(
          {
            category: price.translations.fr.name,
            value: price.value,
            currency: "€"
          }
        )
      });
    } else {
      prices.push(
        {
          category: event_prices.translations.fr.name,
          value: event_prices.value,
          currency: "€"
        }
      )
    }
  }
  return prices;
}

function insertFieldsToParsehubEvents(events) {
  return events.map((api_event) => {
    const is_ignored = setIgnored(api_event);
    if (!(is_ignored)) {
      const tags = createTagsArray(api_event.categories);
      const mediasPhotos = createMediasPhotosArray(api_event.media);
      const dates = createDateArrays(api_event.dates);
      const descriptions = createDescriptionsArray(api_event.translations);
      const prices = createPricesArray(api_event.prices);
      let priceInfo;

      if (api_event.is_free === true) {
        priceInfo = "Gratuit";
        tags.push({name: "Gratuit"});
      }
      return (
        {
          url: api_event.translations.fr.agenda_url,
          title: api_event.translations.fr.name,
          tags: tags,
          mediasPhotos: mediasPhotos,
          singleDate: dates.singleDate,
          calendar: dates.calendar,
          dateInfo: `Du ${ api_event.date_start } au ${ api_event.date_end }`,
          descriptions: descriptions,
          places: [
            {
              name: api_event.place.translations.fr.name,
              address: `${api_event.place.translations.fr.address_line1} ${api_event.place.translations.fr.address_line2}`,
              addressShort: api_event.place.translations.fr.address_line2
            }
          ],
          contacts: [
            {
              website: api_event.translations.fr.website,
              email: api_event.translations.fr.email,
              phone: api_event.translations.fr.phone_contact,
              facebook: api_event.facebook_link
            }
          ],
          prices: prices,
          priceInfo: priceInfo,
          ignored: is_ignored
        }
      )
    } else {
      return undefined;
    }
  })
}

async function generateToken() {
  const headers = {
      'Authorization': `Basic ${process.env.API_KEY}`
  };
  const dataString = 'grant_type=client_credentials';
  const options = {
      url: 'https://api.brussels:443/api/token',
      method: 'POST',
      headers: headers,
      body: dataString,
      data: dataString
  };
  try {
    const token = await axios(options);
    console.log(token.data.access_token);
    return token.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

async function getAndTransformEventsFromAPI(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  };
  const options = {
    method: 'GET',
    headers: headers,
  };
  const parsehub_events = {
    baseUrl: baseUrl,
    countryCode: countryCode,
    events: []
  };
  let i = 1;
  console.log("Collecting events...");
  do {
    try {
      const res = await axios(`https://api.brussels:443/api/agenda/0.0.1/events?page=${i}`, options);
      let events = res.data.response.results.event;
      // fs.writeFile('parsehub_events.json', JSON.stringify(events));

      if (i === 1) {
        pageCount = res.data.response.pageCount;
      }
      events = insertFieldsToParsehubEvents(events);
      events.forEach((parsehub_event) => {
        parsehub_events.events.push(parsehub_event);
      });
    } catch (error) {
      console.log(error);
    }
    i++;
  } while (i <= pageCount);
  parsehub_events.events = parsehub_events.events.filter(function(evt) {
    return evt != null;
  });
  fs.writeFile('parsehub_events.json', JSON.stringify(parsehub_events));
  console.log("Success !");
}

async function main() {
  let access_token = await generateToken();
  let res = getAndTransformEventsFromAPI(access_token);
}

main();
