require('dotenv').config()
const config = require('./config')
const mongoose = require('mongoose')
const { hashPassword } = require('../auth/auth')
const { UserModel } = require('../model/users')
const { BlogModel } = require('../model/blog')

const seed = async () => {
  if (config.ENV !== 'development') {
    console.log('Unsafe to seed on non-dev environments')
    return
  }

  console.log(config.MONGO_URI)
  await mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async con => {
    console.log('DB connection successful')

    try {
      await UserModel.collection.drop()
      await BlogModel.collection.drop()
      console.log('Reset database succesfully')
    } catch (error) {
      return
    }

    const { salt, hash } = hashPassword('123456')
    const userAdmin = new UserModel({
      username: 'admin',
      password: { salt, hash },
      fullName: 'admin',
      role: 'admin',
      isAdmin: true
    })

    const userB = new UserModel({
      username: 'jannie123',
      password: { salt, hash },
      fullName: 'CEO of Sanitation',
      role: 'janitor',
      isAdmin: false
    })

    const blogA = new BlogModel({
      title: 'lorem ipsum dolor',
      status: 'published',
      content: 'lorem ipsum dolor sit amet',
      author: ['admin']
    })

    const blogB = new BlogModel({
      title: 'my second article',
      status: 'draft',
      content: 'hello world hello world hello world',
      author: ['admin2']
    })

    await userAdmin.save()
    await userB.save()
    await blogA.save()
    await blogB.save()

    console.log('Finished seeding')
  })
}

module.exports = seed
