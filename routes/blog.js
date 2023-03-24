const express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('../utils/config')
const mongoose = require('mongoose')
const { BlogModel } = require('../model/blog')

router.get('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.redirect('/blog')
  }

  passport.authenticate('loggedIn', { session: false }, async (error, user, info) => {
    const blog = await BlogModel.findById(req.params.id)

    if (!blog) {
      return res.redirect('/blog')
    }

    // Not logged in: private article not found
    if ((error || !user) && blog.status !== 'published') {
      return res.redirect('/blog')
    }

    blog.version = config.VERSION
    return res.render('article', blog)
  })(req, res)
})

router.delete('/:id', passport.authenticate('loggedIn', { session: false }), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid ID' })
  }

  const blog = await BlogModel.findByIdAndDelete(req.params.id)
  if (!blog) {
    return res.status(404).send({ error: 'Blog not found' })
  }

  return res.status(200).send(blog)
})

router.put('/:id', passport.authenticate('loggedIn', { session: false }), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid ID' })
  }

  if (req.body._id || req.body.id) {
    return res.status(401).send({ error: 'Setting custom blog ID is prohibited' })
  }

  const blogExists = await BlogModel.findById(req.params.id)
  if (!blogExists) {
    return res.status(400).send({ error: 'ID does not exist' })
  }

  const updatedBlog = new BlogModel({ ...blogExists._doc, ...req.body })
  BlogModel.updateOne({ _id: req.params.id }, updatedBlog._doc, async (err, doc) => {
    if (err) return res.status(400).send({ error: err })

    const blog = await BlogModel.findById(req.params.id)
    return res.status(200).send(blog)
  })
})

router.post('/', passport.authenticate('loggedIn', { session: false }), (req, res) => {
  if (!req.body.title || !req.body.status) {
    return res.status(400).send({ error: 'Missing field(s) in request body' })
  }

  if (req.body._id || req.body.id) {
    return res.status(401).send({ error: 'Setting custom blog ID is prohibited' })
  }

  const blog = new BlogModel(req.body)
  blog.save((err) => {
    if (err) return res.status(400).send({ error: err })
    return res.status(200).send(blog)
  })
})

router.get('/', (req, res) => {
  passport.authenticate('loggedIn', { session: false }, async (error, user, info) => {
    // Not logged in: only send published blog posts
    if (error || !user) {
      const published = await BlogModel.find({ status: 'published' }).sort({ date: -1 })
      if (!published) {
        return res.status(404).send({ error: 'No posts found' })
      }

      return res.status(200).send(published)
    }

    // Send all blog posts
    const posts = await BlogModel.find({}).sort({ date: -1 })
    if (!posts) {
      return res.status(404).send({ error: 'No posts found' })
    }

    return res.status(200).send(posts)
  })(req, res)
})

module.exports = router
