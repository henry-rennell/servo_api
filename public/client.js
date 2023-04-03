
let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  const map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
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
        title: `${location.owner}`
      })
      marker.setMap(map)
    }))
}


initMap()


//const station = require('../models/station')



