const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }
  },
  fullName: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.model('user', UserSchema)
module.exports = { UserSchema, UserModel }
