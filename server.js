const express = require("express");
const app = express();
const config = require("./config");
const expressLayouts = require("express-ejs-layouts");
const Station = require("./models/station");
const dayjs = require("dayjs");

const db = require("./db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(require("./middlewares/method_override"));

// // clock
// app.use((req, res, next) => {
//   // set interval in here
//   const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
//   res.locals.currentTime = currentTime;
//   next();
// });

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

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
