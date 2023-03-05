require('dotenv').config()
const config = require('./config')
const mongoose = require('mongoose')
const { hashPassword } = require('../auth/auth')
const { UserModel } = require('../model/users')
const { BlogModel } = require('../model/blog')

const seed = () => {
  if (config.ENV !== 'development') {
    console.log('Unsafe to seed on non-dev environments')
    return
  }

  console.log(config.MONGO_URI)
  mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async con => {
    console.log('DB connection successful')

    try {
      await UserModel.collection.drop()
      await BlogModel.collection.drop()
      console.log('Reset database succesfully')
    } catch (error) {
      console.log('ERROR while resetting database: ', error)
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
      previewImg: '/assets/temp-blog-post.png',
      content: 'lorem ipsum dolor sit amet <h1>asd</h1>',
      subtitle: 'lorem ipsum dolor',
      author: ['admin']
    })

    const blogB = new BlogModel({
      title: 'my second article',
      status: 'draft',
      previewimg: '/assets/temp-blog-post.png',
      content: 'hello world hello world hello world',
      subtitle: 'hello world',
      author: ['admin2']
    })

    await userAdmin.save()
    await userB.save()
    await blogA.save()
    await blogB.save()

    console.log('Finished seeding')
    mongoose.connection.close()
  })
}

seed()
