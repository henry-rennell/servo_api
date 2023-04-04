import { setClock } from './clock.js'
let map;


async function initMap(location) {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: location.lat, lng: location.lng },
    zoom: 13,
    minZoom: 10
  });
  map.addListener('dragend', () => {
    const bounds = map.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const data = {
      ne: {lat: ne.lat(), lng: ne.lng()},
      sw: {lat: sw.lat(), lng: sw.lng()}
    };
    axios.get(`/api/stations/bounds?neLat=${data.ne.lat}&neLng=${data.ne.lng}&swLat=${data.sw.lat}&swLng=${data.sw.lng}`)
    .then(arr => { arr.data.forEach(location => {
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
    })})
  })
}

//function to handle user allowing geolocation
function success(position) {
  initMap({lat: position.coords.latitude, lng: position.coords.longitude})
}
//function to handle browser has geolocation available but user blocks access to it 
function error() {
  initMap({lat:-37.8136, lng: 144.9631})
}

//this if statement handles if the browser does not support geolocation api 
if (!navigator.geolocation) {
    initMap({lat:-37.8136, lng: 144.9631})
} else {
  //if the browser does support geolocation API
  navigator.geolocation.getCurrentPosition(success, error);
}


setInterval(setClock, 1000);


const centerLatitude = -37.8136; // Melbourne latitude
const centerLongitude = 144.9631; // Melbourne longitude

  // Display Melbourne latitude and longitude on the right sidebar
  const centerLatitudeElem = document.getElementById('center-latitude');
  const centerLongitudeElem = document.getElementById('center-longitude');
  centerLatitudeElem.textContent = centerLatitude.toFixed(4);
  centerLongitudeElem.textContent = centerLongitude.toFixed(4);


