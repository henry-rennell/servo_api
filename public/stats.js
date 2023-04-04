const div = document.querySelector('.owner-list')

function renderOwnerList(owners) {
    div.innerHTML = owners.map((owner) => renderOwner(owner)).join('')
}

function renderOwner(owner) {
    return `<p>${owner.owner} ${owner.count}</p>`
}


axios.get('/api/owners').then(result => {
    console.log(result.data.slice(0, 7))
    return result.data.slice(0, 7)
}).then(renderOwnerList)