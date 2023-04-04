//all of this code has been refactored hence is commented out -> will be removed at a later date

// let markers = [];

//       async function initMap() {
//         const { Map } = await google.maps.importLibrary("maps");
//         let map = new Map(document.getElementById("map"), {
//           zoom: 8,
//           center: { lat: -37.8136, lng: 144.9631 },
//         });

//         fetch("/api/stations/all")
//           .then((res) => res.json())
//           .then((stations) => {
//             stations.forEach((station) => {
//               let marker = new google.maps.Marker({
//                 position: { lat: station.lat, lng: station.long },
//                 map: map,
//                 title: station.owner,
//                 label: station.owner,
//               });
              
//                 marker.addListener("mouseover", () => {
//                   new google.maps.InfoWindow({
//                     content: marker.getTitle(),
//                   }).open(map, marker);
                  
//                 });
             

//               let contentString =
//                 "<div>" +
//                 "<h3>" +
//                 station.owner +
//                 "</h3>" +
//                 "<p>" +
//                 station.address +
//                 "</p>" +
//                 "</div>";
//               let infoWindow = new google.maps.InfoWindow({
//                 content: contentString,
//               });
//               marker.addListener("click", () => {
//                 infoWindow.open(map, marker);
//               });

//               markers.push(marker);
//             });
//           });
//       }
//       initMap();