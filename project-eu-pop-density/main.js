// import { Loader } from "@googlemaps/js-api-loader"

const express = require('express')
const server = express()
// const html = require('./index.html')
require('dotenv').config()


// const loader = new Loader({
//   apiKey: process.env.API_KEY,
//   version: "weekly",
// })
// loader.load().then(() => {
  // map = new google.maps.Map(document.getElementById("map"), {
  //   center: { lat: -34.397, lng: 150.644 },
  //   zoom: 8,
  // })
// })

server.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Simple Map</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <style type="text/css">
          /* Always set the map height explicitly to define the size of the div
           * element that contains the map. */
          #map {
            height: 100%;
          }

          /* Optional: Makes the sample page fill the window. */
          html,
          body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
        <script>
          let map;

          function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
              center: { lat: -34.397, lng: 150.644 },
              zoom: 8,
            });
          }
        </script>
      </head>
      <body>
        <div id="map"></div>

        <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHWSkU8sg7sAALFLOvCB0nzOt1VPM8zW4&callback=initMap&libraries=&v=weekly"
          async
        ></script>
      </body>
    </html>

  `)
})

server.listen(3000)