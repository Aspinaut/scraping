const level = 0
const geojson = require(`./tmp/nuts${level}.json`)
const density = require(`./tmp/nuts${level}_density.json`)
const fs = require('fs').promises

// nuts 2 and 3

// let newMap = geojson.features.map((region) => {
//   let regionDensity = density.find(el => el["unit,geo\\time"] === region.properties.NUTS_ID)
//   if (regionDensity) {
//     if (regionDensity["2019 "]) {
//       region.properties.density = regionDensity["2019 "]
//     } else if (regionDensity["2018 "]) {
//       region.properties.density = regionDensity["2018 "]
//     }
//   }
//   region.properties.events = 0
//   return region
// })

// nuts 0 (countries)

let newMap = geojson.features.map((country) => {
  let countryDensity = density.find(el => el["NUTS_0"] === country.properties.postal)
  if (countryDensity) {
    country.properties.density = countryDensity["2020"]
    country.properties.events = 0
  }
  return country
})

fs.writeFile(`./tmp/nuts${level}_final.json`, JSON.stringify(newMap))
