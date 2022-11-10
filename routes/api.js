const express = require('express')
const router = express.Router()
const usersRoute = require('./users')
const blogRoute = require('./blog')
const passport = require('passport')

router.use('/users', passport.authenticate('loggedIn', { session: false }), usersRoute)
router.use('/blog', blogRoute)

module.exports = router
