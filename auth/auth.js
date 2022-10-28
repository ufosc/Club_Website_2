const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const pbkdf2 = require('pbkdf2')

const config = require('../config')
const PBKDF2_ITERATIONS = 10000

exports.tokenizeUser = (user) => jwt.sign({ id: user.id }, config.secret)

const generateHash = (password, salt) => {
  return pbkdf2.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 128).toString()
}

exports.hashPassword = (password) => {
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = generateHash(password, salt)
  return { salt, hash }
}

exports.validatePasswordHash = (user, passwordAttempt) => {
  if (!user || !passwordAttempt) {
    return false
  }
  const { hash, salt } = user.password
  return hash === generateHash(passwordAttempt, salt)
}
