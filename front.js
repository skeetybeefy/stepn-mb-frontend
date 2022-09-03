const express = require('express')
const path = require("path")
const https = require("https")
const fs = require("fs")

const PORT = 80
const PORT_SSL = 443

const key = fs.readFileSync('key.pem', 'utf-8')
const cert = fs.readFileSync('certificate.pem', 'utf-8')
const ca = [
  fs.readFileSync('cert_inter.pem', 'utf-8'),
  fs.readFileSync('cert_root.pem', 'utf-8')
]

const appSecure = express()
appSecure.use(express.static(path.resolve(__dirname, "build")))

https.createServer({
  key: key,
  cert: cert,
  //ca: ca
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