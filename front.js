const express = require('express')
const path = require("path")
const https = require("https")
const fs = require("fs")

const PORT = 80
const PORT_SSL = 443

const key = fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem'))
const cert = fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem'))

const appSecure = express()
appSecure.use(express.static(path.resolve(__dirname, "build")))

https.createServer({
  key: key,
  cert: cert
}, appSecure)

appSecure.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

appSecure.listen(PORT_SSL)

const app = express()
app.get("*", (req, res) => {
  res.redirect("https://" + req.headers.host + req.url)
})

app.listen(PORT)