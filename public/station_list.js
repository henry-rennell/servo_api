const nearest = document.querySelector('.nearest')

function renderStationList(stations) {
    nearest.innerHTML = stations.map((station) => renderStation(station)).join('')
}

// function renderStation(station) {
//     return `<p>${station.name} ${station.owner} ${station.address}<p>`
// }

axios.get('/api/stations/all').then(result => {
    return result.data.slice(0, 10)
}).then(renderStationList)


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
    return `<p><img src="${imgSrc}" /> <span>${station.name} ${station.owner} ${station.address}</span></p>`
}