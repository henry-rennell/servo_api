const commoditiesDate = document.querySelector('.commodity-date')
const wti = document.querySelector('.wti')
const brent = document.querySelector('.brent')
const naturalGas = document.querySelector('.natural-gas')

axios.get(`https://commodities-api.com/api/latest?access_key=ujdxf7645w3wcfv7g6f4a212pxbb6erlhs1120cfti33xr50h77fh5hoa4jk&%20base=USD&symbols=WTIOIL,BRENTOIL,NG`).then(result => {
    const { date } = result.data.data
    const { WTIOIL, BRENTOIL, NG } = result.data.data.rates
    console.log(result.data.data)
    commoditiesDate.textContent = date
    wti.textContent = (1 / WTIOIL).toFixed(2)
    brent.textContent = (1 / BRENTOIL).toFixed(2)
    naturalGas.textContent = (1 / NG).toFixed(2)
})

