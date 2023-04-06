import { setClock } from './clock.js'
export let map;
let markers = [];
let mapCenter;
let mapBounds;
const nearest = document.querySelector('.nearest')
const addressElem = document.getElementById('location-address');
const centerLatitudeElem = document.getElementById('center-latitude');
const centerLongitudeElem = document.getElementById('center-longitude');
const form = document.querySelector('form')
let marker
let geocoder
let responseDiv


//initiates map
async function initMap(location) {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  geocoder = new google.maps.Geocoder();
  map = new Map(document.getElementById("map"), {
    center: { lat: location.lat, lng: location.lng },
    zoom: 13,
    minZoom: 10
  });
  //once the map is loaded, 
  map.addListener('tilesloaded', () => {
    createAndRenderMarkers(map)
    getCenterOfMap(map)
  })
  //once the user drag
  map.addListener('dragend', () => {
    assignBoundaries(map)
    checkMarkers(map)
  })
  map.addListener('zoom_changed', () => {
    assignBoundaries(map)
    checkMarkers(map)
  })

  // create elements for search form in map
  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

  marker = new google.maps.Marker({
    map,
  });
  // passes address object to geocode function
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
}
//checks if all markers in the markers [] are within the bounds.
function checkMarkers(map) {
  let neBound = mapBounds.ne
  let swBound = mapBounds.sw
  markers.forEach(marker => {
    let markerIndex = markers.indexOf(marker)
    let latLng = marker.getPosition()
    let markerLat = latLng.lat()
    let markerLng = latLng.lng()
    if (markerLat > neBound.lat || markerLat < swBound.lat || markerLng > neBound.lng || markerLng < swBound.lng) {
      marker.setMap(null)
      markers.splice(markerIndex, 1)
    }
  })
}

function getCenterOfMap(map) {
  //initialising an instance of Geocoder
  const geocoder = new google.maps.Geocoder();
  //getting map center coords object
  let latLng = map.getCenter()
  let lat = latLng.lat()
  let lng = latLng.lng()
  //setting html text content of latitude and longitude elements
  centerLatitudeElem.textContent = lat.toFixed(4);
  centerLongitudeElem.textContent = lng.toFixed(4);

  let centerCoords = {lat, lng}
  //using geocoder based on centerCoords
  geocoder
    .geocode({location: centerCoords})
    .then(res => {addressElem.textContent = res.results[0].formatted_address})//setting html element as the reverse geocoded coords
  //function to collect and render the 10 nearest stations
  getNearestStations(lat, lng)
}

function getNearestStations(lat, lng) {
  //calling server route to get 10 nearest stations
  axios.get(`/api/stations/nearest?rad=5000&lat=${lat}&lng=${lng}`)
  .then(result => {return result.data.slice(0, 10)})
  .then(renderStationList)
}

//calls all of the functions needed to create and render the markers 
function createAndRenderMarkers(map) {
  assignBoundaries(map);
  renderMarkers(map);
}

function getBounds(map) {
  const bounds = map.getBounds();
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  const data = {
    ne: {lat: ne.lat(), lng: ne.lng()},
    sw: {lat: sw.lat(), lng: sw.lng()}
  };
  mapBounds = {ne: data.ne, sw: data.sw}
}

//assigns boundaries of the map and calls createmarkers()
function assignBoundaries(map) {
  getBounds(map)
  createMarkers(mapBounds)
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
      title: `${location.name}`,
      icon: { url: markerIcon },
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
  let titles = markers.map(marker => {
    return marker.getTitle();
  })

  if (titles.includes(marker.getTitle())) {
    return
  } else {
    markers.push(marker)
  }
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
//rendering nearest station list
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
//assigning content of nearest station list to html 
function renderStationList(stations) {
  nearest.innerHTML = stations.map((station) => renderStation(station)).join('')
}

//this if statement handles if the browser does not support geolocation api 
if (!navigator.geolocation) {
  initMap({lat:-37.8136, lng: 144.9631})
} else {
  //if the browser does support geolocation API
  navigator.geolocation.getCurrentPosition(success, error);
}

function geocode(request) {
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      return results;
    })
    .catch((e) => {
      console.log(e)
      console.log("Geocode was not successful...");
    });
}

setInterval(setClock, 1000);



