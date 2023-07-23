const fs = require('fs')
const { resolve } = require('path')
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const passport = require('passport')
const { ImageModel } = require('../model/images')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create directory if it doesnt exist.
    if (!fs.existsSync('uploads/')) {
      fs.mkdirSync('uploads/', { recursive: true })
    }
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // If its not a .jpeg, then it will be caught later.
    const suffix = (file.mimetype === 'image/png') ? '.png' : '.jpeg'
    const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, prefix + suffix)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.fieldname !== 'File' || file.encoding !== '7bit') {
    req.uploadFileError = 'Bad File Encoding'
    cb(null, false)
    return
  }

  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    req.uploadFileError = 'bad file type: use .png or .jpeg instead'
    cb(null, false)
    return
  }

  cb(null, true)
}

// Max size: 25MB
const upload = multer({ storage, fileFilter, limits: { fileSize: 26214400 } })

// Return all images.
router.get('/', passport.authenticate('loggedIn', { session: false }), async (req, res) => {
  const images = await ImageModel.find().sort({ date: -1 })
  if (!images) return res.status(404).send({ error: 'No posts found' })
  res.status(200).send(images)
})

// Return image by its id.
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid ID' })
  }

  const imageExists = await ImageModel.findById(req.params.id)
  if (!imageExists) {
    return res.status(404).send({ error: 'ID does not exist' })
  }

  // May exist in DB but not exist in filesystem.
  if (!fs.existsSync(imageExists.path)) {
    await ImageModel.findByIdAndDelete(req.params.id)
    return res.status(404).send({ error: 'image does not exist' })
  }

  res.status(200).sendFile(resolve(imageExists.path))
})

// Create a new image.
router.post('/', passport.authenticate('loggedIn', { session: false }), upload.single('File'), (req, res) => {
  if (typeof req.uploadFileError === 'string') {
    return res.status(500).send({ error: req.uploadFileError })
  }

  if (!req.file || !req.body || !req.body.Description) {
    return res.status(500).send({ error: 'expected image and description' })
  }

  const image = new ImageModel({
    filename: req.file.filename,
    description: req.body.Description,
    path: req.file.path
  })

  image.save((err) => {
    if (err) return res.status(500).send({ error: 'Internal Server Error' })
  })

  return res.status(200).send(image)
})

// Delete an existing image by its ID.
router.delete('/:id', passport.authenticate('loggedIn', { session: false }), async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ error: 'Invalid ID' })
  }

  const imageExists = await ImageModel.findByIdAndDelete(req.params.id)
  if (!imageExists) {
    return res.status(404).send({ error: 'ID does not exist' })
  }

  // Delete file (from disk) if it exists.
  if (fs.existsSync(imageExists.path)) {
    fs.unlinkSync(resolve(imageExists.path))
  }

  return res.status(200).send(imageExists)
})

module.exports = router
