const express = require("express")
const app = express()
const config = require("./config")
const expressLayouts = require("express-ejs-layouts")
const Station = require('./models/station')

const db = require('./db')

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(require("./middlewares/method_override"))

app.get("/", (req, res) => {
  res.render("home", {api_key: process.env.GOOGLE_API_KEY})
})

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})

app.get('/api/station/all', (req,res) => {
    Station.getAll().then(dbres => res.json(dbres.rows))
})