const express = require('express')
const router = express.Router()
const passport = require('passport')

const usersRoute = require('./users')
const blogRoute = require('./blog')
const contactRoute = require('./contact')

router.use('/users', passport.authenticate('loggedIn', { session: false }), usersRoute)
router.use('/blog', blogRoute)
router.use('/contact', contactRoute)

module.exports = router
