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

app.get("/api/owners", (req, res) => {
  Station.getOwners().then((owners) => res.json(owners));
});
app.get("/api/stations/all", (req, res) => {
  Station.getAll().then((dbres) => res.json(dbres.rows));
});


// random station
app.get("/api/stations/random", (req, res) => {
  Station.getRandom().then(dbres => res.json(dbres))
})

app.get('/api/stations/bounds', (req, res) => {
  //api/stations/bounds?neLat=37.0000&neLng=144.000&swLat=70.000&swLng=80.0000
  let neLat = Number(req.query.neLat)
  let neLng = Number(req.query.neLng)
  let swLat = Number(req.query.swLat)
  let swLng = Number(req.query.swLng)
  console.log(neLat, neLng, swLat, swLng)


  let sql = `select * from service_stations where lat between $1 and $2 and long between $3 and $4;`;

  db.query(sql, [swLat, neLat, swLng, neLng],(err, dbRes) => {
    res.send(dbRes)
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
