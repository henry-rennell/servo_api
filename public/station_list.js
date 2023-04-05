const nearest = document.querySelector('.nearest')

function renderStationList(stations) {
    nearest.innerHTML = stations.map((station) => renderStation(station)).join('')
}

function renderStation(station) {
    return `<p>${station.name} ${station.owner} ${station.address}<p>`
}

axios.get('/api/stations/all').then(result => {
    return result.data.slice(0, 10)
}).then(renderStationList)


// function renderStation(station) {
//     let imgSrc;
//     if (station.owner === 'Caltex') {
//         imgSrc = 'https://cdn.iconscout.com/icon/free/png-32/caltex-3442887-2875348.png';
//       } else if (station.owner === 'BP') {
//         imgSrc = 'https://cdn.iconscout.com/icon/free/png-32/bp-14-282567.png?f=avif&w=512';
//       } else if (station.owner === 'Shell') {
//         imgSrc = 'https://cdn.iconscout.com/icon/free/png-32/shell-9-282410.png?f=avif&w=512';
//       } else if (station.owner === '7-Eleven Pty Ltd') {
//         imgSrc = 'https://cdn.iconscout.com/icon/free/png-32/7-eleven-3442178-2875995.png?f=avif&w=512';
//       } else if (station.owner === 'United') {
//         imgSrc = 'https://cdn.iconscout.com/icon/free/png-32/7-eleven-3442178-2875995.png?f=avif&w=512'; //wrong
//       }


//     return `<p><img src="${imgSrc}" /> <span>${station.name} ${station.owner} ${station.address}</span></p>`
// }