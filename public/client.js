import { setClock } from './clock.js'
export let map;
let markers = [];
let mapCenter;
const nearest = document.querySelector('.nearest')


function renderStation(station) {
  let imgSrc;
  if (station.owner === 'Caltex') {
      imgSrc = '/icons/caltex.png';
    } else if (station.owner === 'BP') {
      imgSrc = '/icons/BP.png';
    } else if (station.owner === 'Shell') {
      imgSrc = '/icons/shell.png';
    } else if (station.owner === '7-Eleven Pty Ltd') {
      imgSrc = '/icons/seven11.png';
    } else if (station.owner === 'United') {
      imgSrc = '/icons/united.png'; 
    } else {
      imgSrc = '/icons/default.png'
    }
  return `<p><img src="${imgSrc}" /> <span>${station.name} ${station.owner} ${station.address}</span>
  <span>${(station.distance / 1000).toFixed(2)}KM</span></p>`
}
function renderStationList(stations) {
  nearest.innerHTML = stations.map((station) => renderStation(station)).join('')
}

//initiates map
async function initMap(location) {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const geocoder = new google.maps.Geocoder();
  map = new Map(document.getElementById("map"), {
    center: { lat: location.lat, lng: location.lng },
    zoom: 13,
    minZoom: 10
  });

  map.addListener('tilesloaded', () => {
    createAndRenderMarkers(map)
  })
  map.addListener('tilesloaded', () => {
    getCenterOfMap(map)
  })
  map.addListener('tilesloaded', () => {
    let latLng = map.getCenter()
    let lat = latLng.lat()
    let lng = latLng.lng()
    axios.get(`/api/stations/nearest?rad=5000&lat=${lat}&lng=${lng}`).then(result => {
        return result.data.slice(0, 10)
    }).then(renderStationList)
  })  
}

function getCenterOfMap (map) {
  const geocoder = new google.maps.Geocoder();
  let latLng = map.getCenter()
  let lat = latLng.lat()
  let lng = latLng.lng()
  const addressElem = document.getElementById('location-address');
  const centerLatitudeElem = document.getElementById('center-latitude');
  const centerLongitudeElem = document.getElementById('center-longitude');
  let centerCoords = {lat, lng}
  geocoder
    .geocode({location: centerCoords})
    .then(res => {
      addressElem.textContent = res.results[0].formatted_address
    })
  centerLatitudeElem.textContent = lat.toFixed(4);
  centerLongitudeElem.textContent = lng.toFixed(4);
}

//calls all of the functions needed to create and render the markers 
function createAndRenderMarkers(map) {
  //resetting markers -> offloading ones that arent needed
  renderMarkers(null);
  markers = [];
  assignBoundaries(map);
  renderMarkers(map);
}

//assigns boundaries of the map and calls createmarkers()
function assignBoundaries(map) {
  const bounds = map.getBounds();
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  const data = {
    ne: {lat: ne.lat(), lng: ne.lng()},
    sw: {lat: sw.lat(), lng: sw.lng()}
  };
  createMarkers(data)
}
//adds every marker in markers [] to the map
function renderMarkers(map) {
  markers.forEach(marker => {
    marker.setMap(map)
  })
}

//function to create markers (data) is the object containing boundaries of the map
function createMarkers(data) {

  axios.get(`/api/stations/bounds?neLat=${data.ne.lat}&neLng=${data.ne.lng}&swLat=${data.sw.lat}&swLng=${data.sw.lng}`)
  .then(arr => { arr.data.forEach(location => {
    let markerIcon = null;
    if (location.owner === 'Caltex') {
      markerIcon = 'https://cdn.iconscout.com/icon/free/png-32/caltex-3442887-2875348.png';
    } else if (location.owner === 'BP') {
      markerIcon = 'https://cdn.iconscout.com/icon/free/png-32/bp-14-282567.png?f=avif&w=512';
    } else if (location.owner === 'Shell') {
      markerIcon = 'https://cdn.iconscout.com/icon/free/png-32/shell-9-282410.png?f=avif&w=512';
    } else if (location.owner === '7-Eleven Pty Ltd') {
      markerIcon = 'https://cdn.iconscout.com/icon/free/png-32/7-eleven-3442178-2875995.png?f=avif&w=512';
    } else {
      markerIcon = 'https://cdn.iconscout.com/icon/premium/png-32-thumb/location-pin-53-520652.png?f=avif&w=512'
    }

    let latLong = {lat: location.lat, lng: location.long}
    let marker = new google.maps.Marker({
      position: latLong,
      map,
      title: `${location.owner}`,
      icon: { url: markerIcon }
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
            marker.addListener('mouseover', () => {
              marker.label = `${location.name}`
            })
    markers.push(marker)
})})
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



