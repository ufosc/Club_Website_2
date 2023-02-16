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

app.get('/blog/:article', (req, res) => {
  res.render('article', {
    version: config.VERSION,
    title: req.params.article,
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae doloremque obcaecati libero nemo voluptates, quas quis officia praesentium repellendus. Perspiciatis dicta distinctio debitis saepe dolor vitae minima nulla maiores . Laborum doloremque iusto consequuntur, facere omnis voluptatum rerum cum minima libero rem temporibus, at dolore perspiciatis cupiditate voluptatem maxime. Soluta ipsam quis in quae, distinctio dolorem. Quis harum excepturi ipsa, blanditiis, soluta maxime suscipit voluptas quisquam, possimus itaque esse voluptatem unde beatae quod temporibus tempore voluptatibus rem nulla eum?<br><br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi illum vel eligendi excepturi quam, expedita quasi pariatur accusantium. Sapiente iste, necessitatibus cupiditate earum quasi iusto quo tempore saepe cumque repudiandae. Ratione odio consequuntur aut error obcaecati, quidem pariatur ut tenetur? Sunt eos animi accusamus, doloribus pariatur repellat necessitatibus aspernatur aliquam natus magnam officia nam sint veritatis tenetur neque voluptatum maiores? Commodi odit totam fuga sed nemo veritatis, ducimus quidem natus provident saepe illum doloribus, dolorum dolore similique, repudiandae voluptate consequatur repellendus? Optio exercitationem totam, sapiente at consequatur tempora sint cupiditate.<br><br>',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, odio officia atque adipisci inventore praesentium veniam id beatae omnis quisquam nihil excepturi alias aliquid ullam debitis eveniet qui nobis. Exercitationem?',
    date: '11/5/2022',
    author: ['John Doe', 'Jane Doe'],
    previewImage: '../assets/temp-blog-post.png'
  })
})

app.get('/:page', (req, res) => {
  res.render('index', { page: req.params.page, version: config.VERSION })
})

db.connect()
http.listen(config.port, () => console.log(`Server running on port ${config.port}`))

const stop = () => {
  server.close();
  database.disconnect();
}

module.exports = {app, stop}