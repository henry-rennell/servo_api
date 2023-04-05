import { map } from "./client.js"

// createing the random pertrol station endpoint
const spotlightInfo = document.querySelector('.spotlight-station')

function renderSpotlight (station){
   spotlightInfo.innerHTML = htmlElementRan(station)
   document.querySelector('.random-station').addEventListener('click', () => {
      centerMapOnStation(station.lat, station.long)})
}

function htmlElementRan (station){
    return `
            <p><a href="#" class="random-station"> ${station.name}</a></p>
            <p>${station.owner}<p>
            <p>${station.address}<p>`
}

axios.get("http://localhost:8080/api/stations/random").then(result => result.data[0]).then(data => renderSpotlight(data))

const refresh = document.querySelector('.refresh-spotlight')

refresh.addEventListener('click', handleRefresh)

function handleRefresh (event){
   event.preventDefault()
   axios.get("http://localhost:8080/api/stations/random").then(result => result.data[0]).then(data => renderSpotlight(data))
}

//const ranStation = document.querySelector('.random-station')

//ranStation.addEventListener


function centerMapOnStation(latitude, longitude) {
   map.setCenter({lat: latitude, lng: longitude  })
 } 

