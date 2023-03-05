const express = require('express')
const router = express.Router()
const auth = require('../auth/auth')
const mongoose = require('mongoose')
const { UserModel } = require('../model/users')

// gets and sends back first 20 users in db, starting with admins
router.get('/', (req, res, next) => {
  UserModel.find({}, null, { limit: 20 }).sort({ isAdmin: -1 }).exec((err, docs) => {
    if (err) return res.status(500).send({ error: 'Database failed to respond' })

    const newDocs = docs.map(doc => {
      doc.password = undefined
      return doc
    })

    return res.status(200).send(newDocs)
  })
})

// get user and send user back
router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid user id' })
  }

  UserModel.findById(req.params.id, (err, doc) => {
    if (err) return res.status(404).send({ error: 'User not found' })

    doc.password = undefined
    return res.status(200).send(doc)
  })
})

// creates new user
router.post('/', async (req, res, next) => {
  if (!req.body.password || !req.body.username || typeof req.body.password !== 'string') {
    return res.status(400).send({ error: 'Missing field(s) in request body' })
  }

  if (req.body._id || req.body.id) {
    return res.status(401).send({ error: 'Setting custom user ID is prohibited' })
  }

  const username = (typeof req.body.username === 'string') ? req.body.username : null
  const usernameTaken = await UserModel.find({ username })
  if (usernameTaken.length !== 0) {
    return res.status(400).send({ error: 'username already exists' })
  }

  const { hash, salt } = auth.hashPassword(req.body.password)
  req.body.password = { hash, salt }

  const newUser = new UserModel({ ...req.body })
  newUser.save((err) => {
    if (err) return res.status(400).send({ error: err })
    return res.status(200).send(newUser)
  })
})

// delete user and send user back
router.delete('/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid user id' })
  }

  const userExists = await UserModel.findById(req.params.id)
  if (!userExists) {
    return res.status(400).send({ error: 'User not found' })
  }

  if (userExists.username === 'admin') {
    return res.status(401).send({ error: 'Deleting admin is prohibited' })
  }

  UserModel.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return res.status(500).send({ error: 'Database failed to respond' })

    doc.password = undefined
    return res.status(200).send(doc)
  })
})

// edit user and send updated user back
router.put('/:id', async (req, res, next) => {
  if (req.body._id) {
    return res.status(400).send({ error: 'Cannot change ID' })
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid user id' })
  }

  if (req.body.password) {
    if (typeof req.body.password !== 'string') {
      return res.status(400).send({ error: 'password field must be of type string' })
    }

    const { hash, salt } = auth.hashPassword(req.body.password)
    req.body.password = { hash, salt }
  }

  const userExists = await UserModel.findById(req.params.id)
  if (!userExists) {
    return res.status(400).send({ error: 'user not found' })
  }

  if (req.body.username !== userExists.username) {
    const username = (typeof req.body.username === 'string') ? req.body.username : null
    const usernameTaken = await UserModel.find({ username })
    if (usernameTaken.length !== 0) {
      return res.status(400).send({ error: 'username already exists' })
    }
  }

  if (userExists.username === 'admin' && (
    typeof req.body.username !== 'undefined' ||
      typeof req.body.isAdmin !== 'undefined' ||
      typeof req.body.role !== 'undefined')) {
    return res.status(401).send({ error: 'Modifying admin username or role is prohibited' })
  }

  const updatedUser = new UserModel({ ...userExists._doc, ...req.body })
  UserModel.updateOne({ _id: req.params.id }, updatedUser._doc, async (err, doc) => {
    if (err) return res.status(400).send({ error: err })

    const user = await UserModel.findById(req.params.id)
    user.password = undefined

    return res.status(200).send(user)
  })
})

module.exports = router
