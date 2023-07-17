/* global describe, it, before */

const fs = require('fs')
const { resolve } = require('path')
const chai = require('chai')
const { app } = require('../app')
const chaiHttp = require('chai-http')
const TestHelper = require('./test-helper')
const expect = chai.expect
const UserModel = require('../model/users').UserModel
const ImageModel = require('../model/images').ImageModel
const auth = require('../auth/auth')
const ENV = require('../utils/config').ENV

chai.use(chaiHttp)
let authenticatedAgent = null
let agent = null

describe('Images Route', () => {
  before(async () => {
    expect(ENV === 'development').to.equal(true)
    const user = await UserModel.findOne()
    authenticatedAgent = new TestHelper(chai, app, auth.tokenizeUser(user))
    agent = new TestHelper(chai, app)
  })

  // IMAGES-GET route.
  describe('Images: GET ROUTE', () => {
    it('Should require authentication', async () => {
      const unauthed = await agent.get('/api/image/')
      const authed = await authenticatedAgent.get('/api/image/')
      expect(unauthed.statusCode).to.equal(401)
      expect(authed.statusCode).to.equal(200)
    })

    it('Should return all images in database', async () => {
      const images = await authenticatedAgent.get('/api/image/')
      const dbImages = await ImageModel.find().sort({ date: -1 }).exec()
      expect(images.text).to.equal(JSON.stringify(dbImages))
    })
  })

  // IMAGES-GET-ID route.
  describe('Images: GET ID ROUTE', () => {
    it('Should not require authentication', async () => {
      const id = await ImageModel.findOne()
      const resp = await agent.get(`/api/image/${id.id}`)
      expect(resp.status).to.equal(200)
    })

    it('Should return an error when ID is malformed', async () => {
      const resp = await agent.get('/api/image/:641a2cbbe8f88f$3bd1a25f8')
      const resp1 = await agent.get('/api/image/123')
      expect(resp.status).to.equal(400)
      expect(resp1.status).to.equal(400)
    })

    it('Should return an error when ID is valid but doesnt exist', async () => {
      const resp = await agent.get('/api/image/64b3c0cf45b4dc3d407b7416')
      const resp1 = await agent.get('/api/image/64b3c0cf45b4dc3d407b7417')
      expect(resp.status).to.equal(404)
      expect(resp1.status).to.equal(404)
    })

    it('Should return an error when image doesnt exist on filesystem', async () => {
      const image = await ImageModel.findOne({ path: 'test/assets/doesnt-exist.jpeg' })
      expect(image).to.not.be.null // eslint-disable-line
      const resp = await agent.get(`/api/image/${image.id}`)
      expect(resp.status).to.equal(404)
    })

    it('Should return image file when image is registered and exists', async () => {
      const image = await ImageModel.findOne({ path: 'test/assets/1x1.png' })
      const resp = await agent.get(`/api/image/${image.id}`)

      // Returns image file.
      expect(resp.status).to.equal(200)
      expect(resp.type).to.equal('image/png')

      // Returns uncompressed image file.
      const data = fs.readFileSync(resolve('test/assets/1x1.png'))
      expect(data.equals(resp.body)).to.equal(true)
    })
  })

  // IMAGES-POST route.
  describe('Images: POST ROUTE', () => {
    it('Should return an error if user is not authenticated', async () => {
      const resp = await agent.post('/api/image/')
      expect(resp.status).to.equal(401)
    })

    it('Should return an error when encoding is not multiform', async () => {
      const user = await UserModel.findOne()
      const resp = await chai.request(app)
        .post('/api/image/')
        .set('Cookie', `jwt=${auth.tokenizeUser(user)}`)
        .set('Content-Type', 'application/json')
        .send({ description: 'desc', file: 'no file' })

      expect(resp.status).to.equal(500)
    })

    it('Should return an error if description is missing', async () => {
      const user = await UserModel.findOne()
      const data = fs.readFileSync(resolve('test/assets/1x1.png'))
      const resp = await chai.request(app).post('/api/image/')
        .set('Cookie', `jwt=${auth.tokenizeUser(user)}`)
        .attach('File', data, '1x1.png')

      expect(resp.status).to.equal(500)
    })

    it('Should return an error if image is missing', async () => {
      const user = await UserModel.findOne()
      const resp = await chai.request(app).post('/api/image/')
        .set('Cookie', `jwt=${auth.tokenizeUser(user)}`)
        .field('Description', 'my failed image upload')

      expect(resp.status).to.equal(500)
    })

    it('Should return an error if image is not jpeg or png', async () => {
      const user = await UserModel.findOne()
      const data = fs.readFileSync(resolve('test/assets/1x1.gif'))
      const resp = await chai.request(app).post('/api/image/')
        .set('Cookie', `jwt=${auth.tokenizeUser(user)}`)
        .field('Description', 'my failed image upload')
        .attach('File', data, '1x1.gif')

      expect(resp.status).to.equal(500)
    })

    it('Should return saved image model', async () => {
      const user = await UserModel.findOne()
      const data = fs.readFileSync(resolve('test/assets/1x1.png'))
      const resp = await chai.request(app).post('/api/image/')
        .set('Cookie', `jwt=${auth.tokenizeUser(user)}`)
        .field('Description', 'my image upload')
        .attach('File', data, '1x1.png')

      expect(resp.status).to.equal(200)
      const respData = JSON.parse(resp.text)
      const dbData = await ImageModel.findById(respData._id)
      expect(dbData === null).to.equal(false)
    })

    it('Should save image to filesystem and database', async () => {
      const user = await UserModel.findOne()
      const data = fs.readFileSync(resolve('test/assets/1x1.png'))
      const resp = await chai.request(app).post('/api/image/')
        .set('Cookie', `jwt=${auth.tokenizeUser(user)}`)
        .field('Description', 'my image upload')
        .attach('File', data, '1x1.png')

      expect(resp.status).to.equal(200)
      const path = JSON.parse(resp.text).path
      expect(fs.existsSync(path)).to.be.true // eslint-disable-line
    })
  })

  // IMAGES-DELETE route.
  describe('Images: DELETE ROUTE', () => {
    it('Should require authentication', async () => {
      const resp = await agent.post('/api/image/')
      expect(resp.status).to.equal(401)
    })

    it('Should return an error if ID is malformed', async () => {
      const resp = await authenticatedAgent.delete('/api/image/:641a2cbbe8f88f$3bd1a25f8')
      const resp1 = await authenticatedAgent.delete('/api/image/123')
      expect(resp.status).to.equal(400)
      expect(resp1.status).to.equal(400)
    })

    it('Should return an error if ID is valid but does not exist', async () => {
      const resp = await authenticatedAgent.delete('/api/image/64b3c0cf45b4dc3d407b7416')
      const resp1 = await authenticatedAgent.delete('/api/image/64b3c0cf45b4dc3d407b7417')
      expect(resp.status).to.equal(404)
      expect(resp1.status).to.equal(404)
    })

    it('Should delete image from database', async () => {
      const image = await ImageModel.findOne({ path: { $ne: 'test/assets/1x1.png' } })
      const resp = await authenticatedAgent.delete(`/api/image/${image.id}`)
      expect(resp.status).to.equal(200)
      const isDeleted = await ImageModel.findById(image.id)
      expect(isDeleted).to.be.null // eslint-disable-line
    })

    it('Should delete image from filesystem if it exists', async () => {
      const image = await ImageModel.findOne({ path: { $ne: 'test/assets/1x1.png' } })
      const resp = await authenticatedAgent.delete(`/api/image/${image.id}`)
      expect(resp.status).to.equal(200)
      expect(fs.existsSync(image.path)).to.be.false // eslint-disable-line
    })
  })
})
