const express = require('express')
const router = express.Router()
const usersRoute = require('./users')

router.use('/users', usersRoute)

module.exports = router
