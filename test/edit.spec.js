/* global describe, it, before */

const chai = require('chai')
const { app } = require('../app')
const chaiHttp = require('chai-http')
const TestHelper = require('./test-helper')
const expect = chai.expect
const UserModel = require('../model/users').UserModel
const ejs = require('ejs')
const BlogModel = require('../model/blog').BlogModel
const auth = require('../auth/auth')
const ENV = require('../utils/config').ENV

chai.use(chaiHttp)
let agent = null
let authenticatedAgent = null

describe('Edit Route', () => {
  before(async () => {
    expect(ENV === 'development').to.equal(true)
    const user = await UserModel.findOne({ username: 'admin' })
    authenticatedAgent = new TestHelper(chai, app, auth.tokenizeUser(user))
    agent = new TestHelper(chai, app)
  })

  // EDIT-BLOG-GET TESTS
  describe('Edit: GET BLOG', () => {
    it('Should require authentication', async () => {
      const authed = await authenticatedAgent.get('/api/edit/blog/')
      const unauthed = await agent.get('/api/edit/blog')
      expect(authed.status).to.equal(200)
      expect(unauthed.status).to.equal(401)
    })

    it('Should return edit-blog page', async () => {
      const resp = await authenticatedAgent.get('/api/edit/blog/')
      ejs.renderFile('./views/edit-blog.ejs', { data: null, isNew: true }, { async: false }, (err, str) => {
        expect(err).to.be.null // eslint-disable-line
        expect(resp.text).to.equal(str)
      })
    })
  })

  // EDIT-BLOG-ID-GET TESTS
  describe('Edit: GET BLOG ID', () => {
    it('Should require authentication', async () => {
      const blog = await BlogModel.findOne()
      const authed = await authenticatedAgent.get(`/api/edit/blog/${blog.id}`)
      const unauthed = await agent.get(`/api/edit/blog/${blog.id}`)
      expect(authed.status).to.equal(200)
      expect(unauthed.status).to.equal(401)
    })

    it('Should return error when ID is malformed', async () => {
      const resp = await authenticatedAgent.get('/api/edit/blog/12!9x')
      expect(resp.status).to.equal(500)
    })

    it('Should return error when ID is valid but doesnt exist', async () => {
      const resp = await authenticatedAgent.get('/api/edit/blog/641cc001ba31117cbb94bb94')
      expect(resp.status).to.equal(404)
    })

    it('Should return edit-blog page', async () => {
      const blog = await BlogModel.findOne()
      const resp = await authenticatedAgent.get(`/api/edit/blog/${blog.id}`)
      ejs.renderFile('./views/edit-blog.ejs', { data: blog, isNew: false }, { async: false }, (err, str) => {
        expect(err).to.be.null // eslint-disable-line
        expect(resp.text).to.equal(str)
      })
    })
  })

  // EDIT-USER-GET TESTS
  describe('Edit: GET USER', () => {
    it('Should require authentication', async () => {
      const authed = await authenticatedAgent.get('/api/edit/user/')
      const unauthed = await agent.get('/api/edit/user')
      expect(authed.status).to.equal(200)
      expect(unauthed.status).to.equal(401)
    })

    it('Should return edit-user page', async () => {
      const resp = await authenticatedAgent.get('/api/edit/user/')
      ejs.renderFile('./views/edit-user.ejs', { data: null, isNew: true }, { async: false }, (err, str) => {
        expect(err).to.be.null // eslint-disable-line
        expect(resp.text).to.equal(str)
      })
    })
  })

  // EDIT-USER-GET-ID TESTS
  describe('Edit: GET USER ID', () => {
    it('Should require authentication', async () => {
      const user = await UserModel.findOne()
      const authed = await authenticatedAgent.get(`/api/edit/user/${user.id}`)
      const unauthed = await agent.get(`/api/edit/user/${user.id}`)
      expect(authed.status).to.equal(200)
      expect(unauthed.status).to.equal(401)
    })

    it('Should return error when ID is malformed', async () => {
      const resp = await authenticatedAgent.get('/api/edit/user/12!9x')
      expect(resp.status).to.equal(500)
    })

    it('Should return error when ID is valid but doesnt exist', async () => {
      const resp = await authenticatedAgent.get('/api/edit/user/641cc001ba31117cbb94bb94')
      expect(resp.status).to.equal(404)
    })

    it('Should return edit-user page', async () => {
      const user = await UserModel.findOne()
      const resp = await authenticatedAgent.get(`/api/edit/user/${user.id}`)
      ejs.renderFile('./views/edit-user.ejs', { data: user, isNew: false }, { async: false }, (err, str) => {
        expect(err).to.be.null // eslint-disable-line
        expect(resp.text).to.equal(str)
      })
    })
  })
})
