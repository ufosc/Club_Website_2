const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
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
    required: false,
    default:'/assets/blog_default_img.jpeg'
  },
  content: {
    type: String,
    required: false
  },
  subtitle: {
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

const BlogModel = mongoose.model('blog', BlogSchema)
module.exports = { BlogSchema, BlogModel }
