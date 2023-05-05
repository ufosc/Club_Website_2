require('dotenv').config()
require('./auth/passport')
const bodyParser = require('body-parser')
const config = require('./utils/config')
const express = require('express')
const db = require('./utils/database')
const rateLimit = require('express-rate-limit')
const CacheModule = require('./utils/cache')
const passport = require('passport')
const auth = require('./auth/auth')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const { UserModel } = require('./model/users')
const { BlogModel } = require('./model/blog')
const { callbacks } = require('./utils/callbacks')

const app = express()
const http = require('http').createServer(app)
const apiRoute = require('./routes/api')

const cache = new CacheModule()
cache.register(...callbacks)
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

app.use('/api', apiRoute)

app.get('/', (req, res) => {
  res.send(cache.cache().indexPage)
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
  passport.authenticate('loggedIn', { session: false }, async (error, user, info) => {
    if (error || !user) {
      res.render('login', { loginError: app.get('loginError'), version: config.VERSION })
      app.set('loginError', null)
      return
    }

    const users = await UserModel.find({}).sort({ isAdmin: -1 }).exec()
    const blog = await BlogModel.find({})
    return res.render('admin', {
      users: (users) || [],
      blog: (blog) || [],
      version: config.VERSION
    })
  })(req, res)
})

app.get('/blog', (req, res) => {
  res.send(cache.cache().blogPage)
})

db.connect()
http.listen(config.port, () => console.log(`Server running on port ${config.port}`))

const stop = () => {
  http.close()
  db.disconnect()
}

module.exports = { app, stop }
