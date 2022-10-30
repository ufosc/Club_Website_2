require('dotenv').config()
require('./auth/passport')
const bodyParser = require('body-parser')
const config = require('./config')
const express = require('express')
const db = require('./database')
const rateLimit = require('express-rate-limit')
const CacheModule = require('./cache')
const passport = require('passport')
const auth = require('./auth/auth')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const http = require('http').createServer(app)

const cache = new CacheModule()
cache.start(config.cache_interval)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(rateLimit(config.limiter))
app.use(express.static('public'))
app.use(express.json())
app.use(session({ secret: config.secret }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('index', { page: 'index' })
})

app.get('/preview', (req, res) => {
  res.render('temporary')
})

app.post('/auth/login', (req, res) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (error || !user) {
      app.set('loginError', info.message)
      return res.redirect(`/${config.admin_route}`)
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) res.send(loginError)
      return res.cookie('jwt', auth.tokenizeUser(user)).redirect(`/${config.admin_route}`)
    })
  })(req, res)
})

app.get(`/${config.admin_route}`, (req, res) => {
  passport.authenticate('loggedIn', { session: false }, (error, user, info) => {
    if (error || !user) {
      res.render('login', { loginError: app.get('loginError') })
      app.set('loginError', null)
      return
    }
    return res.render('temporary')
  })(req, res)
})

app.get('/:page', (req, res) => {
  res.render('index', { page: req.params.page })
})

db.connect()
http.listen(config.port, () => console.log(`Server running on port ${config.port}`))
