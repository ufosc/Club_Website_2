const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { page: 'index' })
})

app.get('/:page', (req, res) => {
  res.render('index', { page: req.params.page })
})

http.listen(3000, () => console.log('Server running on port 3000'))
