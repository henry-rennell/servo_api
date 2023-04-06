const div = document.querySelector('.owner-list')
const totalStations = document.querySelector('.total-stations')
const totalOwners = document.querySelector('.total-owners')

function renderOwnerList(owners) {
    div.innerHTML = owners.map((owner) => renderOwner(owner)).join('')
}

function renderOwner(owner) {
    return `<p>${owner.owner} <span>${owner.count}</span></p>`
}

function renderCounts(object) {
    totalOwners.textContent = object.total_owners
    totalStations.textContent = object.total_stations
}

axios.get('/api/stats').then(result => {
    return result.data
}).then(object => {
    renderOwnerList(object.owners)
    renderCounts(object)
})