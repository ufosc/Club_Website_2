const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  previewImg: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  author: {
    type: [String],
    required: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const blogModel = mongoose.model('blog', blogSchema)
module.exports = { blogSchema, blogModel }
