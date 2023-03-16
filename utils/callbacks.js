const ejs = require('ejs')
const config = require('./config')
const { BlogModel } = require('../model/blog')

const cacheIndexPage = () => {
  const data = { page: 'UF OSC | Home', version: config.VERSION }
  const indexPageData = { indexPage: '' }
  ejs.renderFile('./views/index.ejs', data, { async: false }, (err, str) => {
    if (err) {
      indexPageData.indexPage = '500 INTERNAL SERVER ERROR'
      return
    }
    indexPageData.indexPage = str
  })

  return indexPageData
}

const cacheBlogPage = async () => {
  const blog = await BlogModel.find({ status: 'published' }).exec()
  const blogPageData = { blogPage: '' }
  const data = { blog: (blog) || [], version: config.VERSION }

  ejs.renderFile('./views/blog.ejs', data, { async: false }, (err, str) => {
    if (err) {
      blogPageData.blogPage = '500 INTERNAL SERVER ERROR'
      return
    }
    blogPageData.blogPage = str
  })

  return blogPageData
}

module.exports = {
  callbacks: [cacheIndexPage, cacheBlogPage]
}
