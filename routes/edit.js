const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { BlogModel } = require('../model/blog')
const { UserModel } = require('../model/users')

// Create new blog entry
router.get('/blog', (req, res, next) => {
  return res.render('edit-blog', { data: null, isNew: true })
})

// Modify existing blog entry
router.get('/blog/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(500).send({ error: "The article you've tried to access no longer exists" })
  }

  const blogExists = await BlogModel.findById(req.params.id)
  if (!blogExists) {
    return res.status(404).send({ error: 'Article not found' })
  }

  return res.render('edit-blog', { data: blogExists, isNew: false })
})

// Create new user
router.get('/user', (req, res, next) => {
  return res.render('edit-user', { data: null, isNew: true })
})

// Modify existing user
router.get('/user/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(500).send({ error: "The user you've tried to access no longer exists" })
  }

  const userExists = await UserModel.findById(req.params.id)
  if (!userExists) {
    return res.status(404).send({ error: 'User not found' })
  }

  return res.render('edit-user', { data: userExists, isNew: false })
})

module.exports = router
