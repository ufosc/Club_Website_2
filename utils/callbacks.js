const ejs = require('ejs')
const config = require('./config')
const { BlogModel } = require('../model/blog')

const cacheIndexPage = async () => {
  const blog = await BlogModel.find({ status: 'published', id: -1 }, null, { limit: 3 }).sort({ date: -1 })
  const data = { version: config.VERSION, blog }
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
  const blog = await BlogModel.find({ status: 'published' }).sort({ date: -1 }).exec()
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
