
let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -33.865143, lng: 151.209900 },
    zoom: 13,
    minZoom: 10
  });
}

initMap();

//const station = require('../models/station')



