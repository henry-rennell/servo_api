const express = require("express");
const app = express();
const config = require("./config");
const expressLayouts = require("express-ejs-layouts");
const Station = require("./models/station");
const dayjs = require("dayjs");
const axios = require('axios');


const db = require("./db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(require("./middlewares/method_override"));


app.get("/", (req, res) => {
  res.render("home", { API_KEY: process.env.GOOGLE_API_KEY });
});

app.get('/api/stations/nearest', (req, res) => {
  //hardcode map center,  work out radius for sql statement, return them in json
  let radiusInMeters = Number(req.query.rad)
  let lat = parseFloat(req.query.lat)
  let lng = parseFloat(req.query.lng)
  const earthRadiusKm = 6371.01;
  // convert radius to radians
  const radiusRad = (radiusInMeters * 1000) / earthRadiusKm;
  // calculate min and max latitude and longitude values
  const minLat = lat - radiusRad;
  const maxLat = lat + radiusRad;
  const minLng = lng - (radiusRad / Math.cos(lat * Math.PI / 180));
  const maxLng = lng + (radiusRad / Math.cos(lat * Math.PI / 180));
  const limit = 700;


  const sql = `select *, earth_distance(ll_to_earth($1::float, $2::float), ll_to_earth(s.lat::float, s.long::float)) as distance from service_stations s where earth_distance(ll_to_earth($1::float, $2::float), ll_to_earth(s.lat::float, s.long::float)) < $3 order by distance asc limit $4;`

  db.query(sql, [lat, lng, radiusInMeters, limit]).then(stations => {

    res.json(stations.rows)
    })
})

app.get("/api/owners", (req, res) => {
  Station.getOwners().then((owners) => res.json(owners));
});
app.get("/api/stations/all", (req, res) => {
  Station.getAll().then((dbres) => res.json(dbres.rows));
});

app.get('/api/stations/nearest', (req, res) => {

})

// random station
app.get("/api/stations/random", (req, res) => {
  Station.getRandom().then(dbres => res.json(dbres))
})

app.get('/api/stations/bounds', (req, res) => {
  //api/stations/bounds?neLat=37.0000&neLng=144.000&swLat=70.000&swLng=80.0000
  let neLat = parseFloat(req.query.neLat)
  let neLng = parseFloat(req.query.neLng)
  let swLat = parseFloat(req.query.swLat)
  let swLng = parseFloat(req.query.swLng)


  let sql = `select * from service_stations where lat between ${swLat} and ${neLat} and long between ${swLng} and ${neLng};`;
  
  db.query(sql, (err, dbRes) => {
    if (err) console.log(err)
    
    res.json(dbRes.rows)
  })
})



app.get('/api/stats', (req, res) => {
  const totals = Station.getTotals()
  const owners = Station.getStats()
  Promise.all([totals, owners]).then(result => {
    return {
      owners: result[1],
      total_owners: result[0][0].total_owners,
      total_stations: result[0][0].total_stations
    }
  }).then(object => res.json(object))
})



app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
