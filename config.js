const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  development: {
    port: process.env.SERVER_PORT || 3000
  },
  production: {
    port: process.env.SERVER_PORT || 3000
  }
}

module.exports = config[NODE_ENV]
module.exports.ENV = NODE_ENV
