const express = require('express')
const router = express.Router()
const config = require('../utils/config')
const FormData = require('form-data')
const axios = require('axios').default

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
const validateContactForm = async (req, res, next) => {
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

  if (typeof req.body.Token !== 'string') {
    return res.status(400).send({ error: 'Bad captcha token. Please refresh the page and try again.' })
  }

  // Sanitise HTML
  req.body.FirstName = encodeURI(req.body.FirstName)
  req.body.LastName = encodeURI(req.body.LastName)
  req.body.Email = encodeURI(req.body.Email)

  next()
}

const validateTurnstile = async (req, res, next) => {
  const ip = req.headers['cf-connecting-ip'] || req.socket.remoteAddress
  const token = req.body.Token
  const secret = config.captcha_secret
  if (typeof secret !== 'string') {
    return res.status(401).send({ error: 'Bad CAPTCHA Response' })
  }

  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', token)
  formData.append('remoteip', ip)

  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      formData)

    if (response.status === 200 && typeof response.data !== 'undefined' && response.data.success) {
      next()
    } else {
      return res.status(401).send({ error: 'Bad CAPTCHA Response' })
    }
  } catch (error) {
    return res.status(401).send({ error: 'Bad CAPTCHA Response' })
  }
}

// Contact form message submission route
router.post('/', validateContactForm, validateTurnstile,
  validateAddress, async (req, res) => {
    const message = {
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
      email: req.body.Email,
      message: req.body.Message
    }

    try {
    // Send message receipt to sender.
      const toSender = await axios.post(config.smtp_host, {
        from: 'no-reply.notifications@ufosc.org',
        to: [message.email],
        subject: '[UF OSC] Your message has been received',
        body: `Thank you for contacting the UF OSC team, your message has been received.<br />
A representative will reach out within 24-48 hours.<br />
<br />
Sincerely,<br />
UF Open Source Club Team`
      })

      if (toSender.status !== 200) {
        return res.status(400).send({
          error: 'Your message could not be sent. Please try again later.'
        })
      }

      // Send copy of message to admin.
      const toAdmin = await axios.post(config.smtp_host, {
        from: 'no-reply.notifications@ufosc.org',
        to: [config.admin_email],
        subject: '[UF OSC] New Message from Website',
        body: `You've received a new message via the OSC website contact form.<br />
<br />
First Name: ${message.firstName}<br />
Last Name: ${message.lastName}<br />
Email Address: ${message.email}<br />
<br />
### BEGIN MESSAGE ###<br />
${message.message}
<br />### END MESSAGE ###<br />
<br />
Please respond by composing a new email to ${message.email}. Replies to this message will not be delivered.
`
      })

      if (toAdmin.status !== 200) {
        return res.status(400).send({
          error: 'Your message could not be sent. Please try again later.'
        })
      }

      return res.status(200).send('Success')
    } catch (error) {
      return res.status(400).send({
        error: 'Your message could not be sent. Please try again later.'
      })
    }
  })

module.exports = router
