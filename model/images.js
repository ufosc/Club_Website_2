const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const ImageModel = mongoose.model('image', ImageSchema)
module.exports = { ImageSchema, ImageModel }
