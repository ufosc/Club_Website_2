const mongoose = require('mongoose')
const config = require('./config')
const url = config.MONGO_URI

mongoose.connection.on('connected', () => {
  console.log(`Database connection open to ${url}`)
})

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected')
})

const __disconnect = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
}

process.on('SIGINT', (error, data) => {
  console.log(`Disconnected by ${error} ${data}`)
  __disconnect()
})

exports.connect = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

exports.disconnect = () => {
  __disconnect()
}
