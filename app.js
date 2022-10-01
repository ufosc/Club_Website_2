require('dotenv').config()
const config = require('./config')
const express = require('express')

const app = express()
const http = require('http').createServer(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { page: 'index' })
})

app.get(`/${config.admin_route}`, (req, res) => {
  res.render('login')
})

app.get('/:page', (req, res) => {
  res.render('index', { page: req.params.page })
})

http.listen(config.port, () => console.log(`Server running on port ${config.port}`))
