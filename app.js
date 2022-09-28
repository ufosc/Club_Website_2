const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

http.listen(3000, () => console.log('Server running on port 3000'))
