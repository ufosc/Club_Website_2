const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const UserModel = require('../model/users').UserModel
const jwtSecret = require('../config').secret
const auth = require('./auth')

const JWTStrategy = passportJWT.Strategy

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.jwt
  }
  return token
}

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, passwordAttempt, done) => {
  const user = await UserModel.findOne({ username })
  if (!user) {
    return done(null, false, { message: 'Incorrect username or password' })
  }

  if (!auth.validatePasswordHash(user, passwordAttempt)) {
    return done(null, false, { message: 'Incorrect username or password' })
  }

  return done(null, user, { message: 'Log-in succesful' })
}))

passport.use('loggedIn', new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtSecret,
  passReqToCallback: true
}, async (req, jwtPayload, done) => {
  req.userID = jwtPayload.id
  if (!mongoose.Types.ObjectId.isValid(req.userID)) {
    return done(null, false, { message: 'invalid token' })
  }

  const user = await UserModel.findById(jwtPayload.id)
  if (!user) {
    return done(null, false, { message: 'invalid token' })
  }

  if (user.password.hash !== jwtPayload.hash) {
    return done(null, false, { message: 'Password changed. Please try logging in again.' })
  }

  return done(null, 'authentication successful')
}))
