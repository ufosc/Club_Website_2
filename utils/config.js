const VERSION = 'V0.1.0'
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://dev:Vm0p67n9M0Z9j0jx@cluster0.cfrfrnu.mongodb.net/?retryWrites=true&w=majority'

// Rate limiter
const limiterTemplate = {
  windowMs: 0,
  max: 0,
  message: '401: Too many requests.',
  standardHeaders: true,
  legacyHeaders: false
}

const config = {
  development: {
    port: process.env.SERVER_PORT || 3000,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 0,
      max: process.env.RATE_LIMIT_MAX || 1500
    },
    cache_interval: process.env.CACHE_INTERVAL * 60 * 1000 || 10 * 1000,
    secret: 'jLJhDQMYtXjCwQmu',
    smtp: null,
    admin_email: process.env.ADMIN_EMAIL
  },
  staging: {
    port: process.env.SERVER_PORT || 3001,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 300000,
      max: process.env.RATE_LIMIT_MAX || 100
    },
    cache_interval: process.env.CACHE_INTERVAL * 60 * 1000 || 15 * 60 * 1000,
    secret: process.env.SECRET,
    smtp: {
      host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    },
    admin_email: process.env.ADMIN_EMAIL
  },
  production: {
    port: process.env.SERVER_PORT || 3002,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 300000,
      max: process.env.RATE_LIMIT_MAX || 100
    },
    cache_interval: process.env.CACHE_INTERVAL * 60 * 1000 || 15 * 60 * 1000,
    secret: process.env.SECRET,
    smtp: {
      host: process.env.SMPT_HOST || 'smtp-relay.sendinblue.com',
      port: process.env.SMPT_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMPT_PASS
      }
    },
    admin_email: process.env.ADMIN_EMAIL
  }
}

module.exports = config[NODE_ENV]
module.exports.ENV = NODE_ENV
module.exports.MONGO_URI = MONGO_URI
module.exports.VERSION = VERSION
