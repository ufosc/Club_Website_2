const NODE_ENV = process.env.NODE_ENV || 'development'

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
    }
  },
  staging: {
    port: process.env.SERVER_PORT || 3001,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 300000,
      max: process.env.RATE_LIMIT_MAX || 100
    }
  },
  staging: {
    port: process.env.SERVER_PORT || 3001
  },
  production: {
    port: process.env.SERVER_PORT || 3002,
    admin_route: process.env.ADMIN_ROUTE || 'admin',
    limiter: {
      ...limiterTemplate,
      windowMs: process.env.RATE_LIMIT_TIMEOUT * 60 * 1000 || 300000,
      max: process.env.RATE_LIMIT_MAX || 100
    }
  }
}

module.exports = config[NODE_ENV]
module.exports.ENV = NODE_ENV
