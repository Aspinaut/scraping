import L from 'leaflet'

let geojson
const info = L.control()
const map = L.map('map').setView([50, 4], 4)

function generateMap(token) {
  const container = L.DomUtil.get('map')

  if (container != null) {
    container._leaflet_id = null
  }

  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, '
  + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map)
}

function highlightFeature(e) {
  const layer = e.target

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  })

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront()
  }

  info.update(layer.feature.properties)
}

function resetHighlight(e) {
  geojson.resetStyle(e.target)
  info.update()
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds())
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  })
}

function getColorPopulation(d) {
  return d > 1000 ? '#800026'
    : d > 500 ? '#BD0026'
      : d > 200 ? '#E31A1C'
        : d > 100 ? '#FC4E2A'
          : d > 50 ? '#FD8D3C'
            : d > 20 ? '#FEB24C'
              : d > 10 ? '#FED976'
                : '#FFEDA0'
}

function stylePopulation(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColorPopulation(feature.properties.density),
  }
}

function addHoverInfoPopulation(map) {
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info')
    this.update()
    return this._div
  }

  info.update = function (props) {
    this._div.innerHTML = `<h4>EU population density / events number</h4>${props
      ? `<b>${props.name}</b><br />${props.density} people / km<sup>2</sup>`
      : 'Hover over a state'}`
  }

  info.addTo(map)
}

function addLegendPopulation(map) {
  const legend = L.control({ position: 'bottomright' })

  legend.onAdd = (map) => {
    const div = L.DomUtil.create('div', 'info legend')
    const grades = [0, 10, 20, 50, 100, 200, 500, 1000]
    const labels = []
    let from
    let to

    for (let i = 0; i < grades.length; i++) {
      from = grades[i]
      to = grades[i + 1]

      labels.push(
        `<i style="background:${getColorPopulation(from + 1)}"></i> ${
          from}${to ? `&ndash;${to}` : '+'}`,
      )
    }

    div.innerHTML = labels.join('<br>')
    return div
  }

  legend.addTo(map)
}

function getColorEvents(d) {
  return d > 1000 ? '#800026'
    : d > 500 ? '#BD0026'
      : d > 200 ? '#E31A1C'
        : d > 100 ? '#FC4E2A'
          : d > 50 ? '#FD8D3C'
            : d > 20 ? '#FEB24C'
              : d > 10 ? '#FED976'
                : '#FFEDA0'
}

function styleEvents(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColorEvents(feature.properties.density),
  }
}

function addHoverInfoEvents(map) {
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info')
    this.update()
    return this._div
  }

  info.update = function (props) {
    this._div.innerHTML = `<h4>EU population density / events number</h4>${props
      ? `<b>${props.name}</b><br />${props.density} people / km<sup>2</sup>` + `<br />${Math.floor(Math.random() * 5000)} events`
      : 'Hover over a state'}`
  }

  info.addTo(map)
}

function addLegendEvents(map) {
  const legend = L.control({ position: 'bottomright' })

  legend.onAdd = (map) => {
    const div = L.DomUtil.create('div', 'info legend')
    const grades = [0, 10, 20, 50, 100, 200, 500, 1000]
    const labels = []
    let from
    let to

    for (let i = 0; i < grades.length; i++) {
      from = grades[i]
      to = grades[i + 1]

      labels.push(
        `<i style="background:${getColorEvents(from + 1)}"></i> ${
          from}${to ? `&ndash;${to}` : '+'}`,
      )
    }

    div.innerHTML = labels.join('<br>')
    return div
  }

  legend.addTo(map)
}

function getColorMix(d) {
  return d > 1000 ? '#800026'
    : d > 500 ? '#BD0026'
      : d > 200 ? '#E31A1C'
        : d > 100 ? '#FC4E2A'
          : d > 50 ? '#FD8D3C'
            : d > 20 ? '#FEB24C'
              : d > 10 ? '#FED976'
                : '#FFEDA0'
}

function styleMix(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColorMix(feature.properties.density),
  }
}

function addHoverInfoMix(map) {
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info')
    this.update()
    return this._div
  }

  info.update = function (props) {
    this._div.innerHTML = `<h4>EU population density / events number</h4>${props
      ? `<b>${props.name}</b><br />${props.density} people / km<sup>2</sup>` + `<br />${Math.floor(Math.random() * 5000)} events`
      : 'Hover over a state'}`
  }

  info.addTo(map)
}

function addLegendMix(map) {
  const legend = L.control({ position: 'bottomright' })

  legend.onAdd = (map) => {
    const div = L.DomUtil.create('div', 'info legend')
    const grades = [0, 10, 20, 50, 100, 200, 500, 1000]
    const labels = []
    let from
    let to

    for (let i = 0; i < grades.length; i++) {
      from = grades[i]
      to = grades[i + 1]

      labels.push(
        `<i style="background:${getColorMix(from + 1)}"></i> ${
          from}${to ? `&ndash;${to}` : '+'}`,
      )
    }

    div.innerHTML = labels.join('<br>')
    return div
  }

  legend.addTo(map)
}

export default function Map(props) {
  const regionData = require(`./nuts${props.level}_final.json`)
  const mapboxAccessToken = process.env.REACT_APP_API_KEY

  generateMap(mapboxAccessToken)

  switch (props.type) {
    case 'Population':
      addHoverInfoPopulation(map)
      geojson = L.geoJson(regionData, {
        style: stylePopulation,
        onEachFeature,
      }).addTo(map)
      addLegendPopulation(map)
      break

    case 'Events':
      addHoverInfoEvents(map)
      geojson = L.geoJson(regionData, {
        style: styleEvents,
        onEachFeature,
      }).addTo(map)
      addLegendEvents(map)
      break

    case 'Mix':
      addHoverInfoMix(map)
      geojson = L.geoJson(regionData, {
        style: styleMix,
        onEachFeature,
      }).addTo(map)
      addLegendMix(map)
      break

    default:
      return null
  }
  return null
}
