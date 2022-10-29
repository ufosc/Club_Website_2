const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    hash: String,
    salt: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const userModel = mongoose.model('user', userSchema)
module.exports = { userSchema, userModel }
