require("dotenv").config()
const db = require('./index.js')
const fs = require('fs');



console.log(process.env.DATABASE_URL)




const stationData = fs.readFileSync('./db/service_stations.txt', {encoding:'utf8', flag:'r'}).split('\n')

stationData.forEach(station => {
    let arr = station.split(',')

    let sql = `insert into service_stations (owner, address, suburb, state, lat, long) values ($1, $2, $3, $4, $5, $6);` 

   db.query(sql, [arr[7], arr[9], arr[10], arr[11], arr[15], arr[16]], (err, dbres) => {
    if(err) console.log(err)
   })

})










