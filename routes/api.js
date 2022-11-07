const express = require('express')
const router = express.Router()
const usersRoute = require('./users')
const passport = require('passport')

router.use('/users', passport.authenticate('loggedIn', { session: false }), usersRoute)

module.exports = router
