const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const config = require('../config')

const transport = (config.smtp == null) ? null : nodemailer.createTransport(config.smtp)

// Regex to validate an email address
const validateAddress = (req, res, next) => {
  if (typeof req.body.Email !== 'string') {
    return res.status(400).send({ error: 'Expected Email field to be a string.' })
  }

  if (req.body.Email.length === 0) {
    return res.status(400).send({ error: 'Expected Email field to be of length greater than 1.' })
  }

  // Regex, validates address
  // eslint-disable-next-line
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.Email))) {
    return res.status(400).send({ error: 'Malformed Email Address.' })
  }

  next()
}

// Basic contact form validation middleware
const validateContactForm = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: 'Missing message body.' })
  }

  if (typeof req.body.FirstName !== 'string') {
    return res.status(400).send({ error: 'Expected FirstName field to be a string.' })
  }

  if (req.body.FirstName.length === 0) {
    return res.status(400).send({ error: 'Expected FirstName field to be of length greater than 1.' })
  }

  if (typeof req.body.LastName !== 'string') {
    return res.status(400).send({ error: 'Expected LastName field to be a string.' })
  }

  if (req.body.LastName.length === 0) {
    return res.status(400).send({ error: 'Expected LastName field to be of length greater than 1.' })
  }

  if (typeof req.body.Message !== 'string') {
    return res.status(400).send({ error: 'Expected Message field to be string.' })
  }

  if (req.body.Message.length === 0) {
    return res.status(400).send({ error: 'Expected Message field to be of length greater than 1.' })
  }

  // Sanitise HTML
  req.body.FirstName = encodeURI(req.body.FirstName)
  req.body.LastName = encodeURI(req.body.LastName)
  req.body.Email = encodeURI(req.body.Email)
  req.body.Message = encodeURI(req.body.Message)

  next()
}

// Contact form message submission route
router.post('/', validateContactForm, validateAddress, async (req, res) => {
  if (transport == null) {
    return res.status(400).send({ error: 'SMTP has not been configured' })
  }

  const message = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Message: req.body.Message
  }

  // Send confirmation receipt to sender
  let info = await transport.sendMail({
    subject: 'Your message was received',
    text: `Dear ${message.FirstName} ${message.LastName},

Thank you for contacting the UF Open Source Club, this is an automated email confirming receipt of your message.
A club representative will be in touch soon.

Kindly,
UF OSC`,
    from: 'no-reply@ufosc.com',
    to: req.body.Email
  })

  if (info.rejected.length !== 0) {
    return req.status(400).send({ error: 'Message was rejected by server. Please try again later.' })
  }

  // Send message confirmation receipt to UF OSC admin
  info = await transport.sendMail({
    subject: 'New Message from Website',
    text: `${message.FirstName} ${message.LastName} sent a message via your website's contact form.
A copy of the message is attached below:

--- BEGIN MESSAGE ---
${message.Message}
--- END MESSAGE ---

You can reach this user via their email address: ${message.Email}
or by replying to this email.
`,
    from: 'no-reply@ufosc.com',
    to: config.admin_email
  })

  if (info.rejected.length !== 0) {
    return req.status(400).send({ error: 'Message was rejected by server. Please try again later,' })
  }

  return res.status(200).send('Success')
})

module.exports = router
