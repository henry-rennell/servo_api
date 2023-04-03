const express = require("express")
const app = express()
const config = require("./config")
const expressLayouts = require("express-ejs-layouts")
const Station = require('./models/station')
const db = require('./db/index')

const db = require('./db')

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(require("./middlewares/method_override"))

app.get("/", (req, res) => {
  res.render("home", {API_KEY: process.env.GOOGLE_API_KEY})
})

app.get('/api/owners', (req, res) => {
  const sql = 'select distinct owner from service_stations;'

  db.query(sql).then(result => {
    const owners = result.rows.map(row => row.owner)
    console.log(owners)
    res.json(owners)
  })
})

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})

app.get('/api/station/all', (req,res) => {
    Station.getAll().then(dbres => res.json(dbres.rows))
})