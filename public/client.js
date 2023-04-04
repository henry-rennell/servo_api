import { setClock } from './clock.js'
let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -33.865143, lng: 151.209900 },
    zoom: 13,
    minZoom: 10
  });
  //getting locations to add map markers
  axios.get('/api/stations/all')
    .then(res => res.data.forEach(location => {
      let latLong = {lat: location.lat, lng: location.long}
      let marker = new google.maps.Marker({
        position: latLong,
        map,
        title: `${location.owner}`,
        label: `${location.name}`
      })

      let contentString =
                "<div>" +
                "<h3>" +
                location.owner +
                "</h3>" +
                "<p>" +
                location.address +
                "</p>" +
                "</div>";
              let infoWindow = new google.maps.InfoWindow({
                content: contentString,
              });
              marker.addListener("click", () => {
                infoWindow.open(map, marker);
              });
      marker.setMap(map)
    }))
}


initMap()
setInterval(setClock, 1000);


//const station = require('../models/station')


const centerLatitude = -37.8136; // Melbourne latitude
  const centerLongitude = 144.9631; // Melbourne longitude

  // Display Melbourne latitude and longitude on the right sidebar
  const centerLatitudeElem = document.getElementById('center-latitude');
  const centerLongitudeElem = document.getElementById('center-longitude');
  centerLatitudeElem.textContent = centerLatitude.toFixed(4);
  centerLongitudeElem.textContent = centerLongitude.toFixed(4);


