/* global describe, it, before */

const chai = require('chai')
const { app } = require('../app')
const chaiHttp = require('chai-http')
const TestHelper = require('./test-helper')
const expect = chai.expect
const UserModel = require('../model/users').UserModel
const auth = require('../auth/auth')
const BlogModel = require('../model/blog').BlogModel
const ENV = require('../utils/config').ENV

chai.use(chaiHttp)
let agent = null
let authenticatedAgent = null
const articleNotFound = '<h1 id="article-title">Article Not Found</h1>'

describe('Blog Route', () => {
  before(async () => {
    expect(ENV === 'development').to.equal(true)
    const user = await UserModel.findOne({ username: 'admin' })
    authenticatedAgent = new TestHelper(chai, app, auth.tokenizeUser(user))
    agent = new TestHelper(chai, app)
  })

  // BLOG-GET TESTS
  describe('Blog: GET ROUTE', () => {
    it('Should return all published posts when unauthenticated', async () => {
      const published = await BlogModel.find({ status: 'published' }).sort({ date: -1 })
      const resp = await agent.get('/api/blog/')
      expect(resp.status).to.equal(200)
      expect(resp.text).to.equal(JSON.stringify(published))
    })

    it('Should return all posts when authenticated', async () => {
      const posts = await BlogModel.find().sort({ date: -1 }).exec()
      const resp = await authenticatedAgent.get('/api/blog/')
      expect(resp.status).to.equal(200)
      expect(resp.text).to.equal(JSON.stringify(posts))
    })
  })

  // BLOG-GET-ID TESTS
  describe('Blog: GET ID ROUTE', () => {
    it('Should return error when id is malformed', async () => {
      const resp = await agent.get('/api/blog/:641a2cbbe8f88f$3bd1a25f8')
      expect(resp.text.search(articleNotFound)).to.not.equal(-1)
    })

    it('Should return error when id is valid but post doesnt exist', async () => {
      const resp = await agent.get('/api/blog/641cc001ba31117cbb94bb94')
      expect(resp.text.search(articleNotFound)).to.not.equal(-1)
    })

    it('Should return error if post is draft and user is unauthenticated', async () => {
      const draft = await BlogModel.findOne({ status: 'draft' })
      const resp = await agent.get(`/api/blog/${draft.id}`)
      expect(resp.text.search(articleNotFound)).to.not.equal(-1)
    })

    it('Should return any post when user is authenticated', async () => {
      const published = await BlogModel.findOne({ status: 'published' })
      const draft = await BlogModel.findOne({ status: 'draft' })
      console.log(published)
      console.log(draft)

      // const req = await authenticatedAgent.get(`/api/blog/${draft.id}`)
      // const req1 = await authenticatedAgent.get(`/api/blog/${published.id}`)

      // expect(req.text.search(articleNotFound)).to.equal(-1)
      // expect(req1.text.search(articleNotFound)).to.equal(-1)
    })
  })

  // BLOG-DELETE TESTS
  describe('Blog: DELETE ROUTE', () => {
    it('Should require authentication', async () => {
      const article = await BlogModel.findOne()
      const resp = await agent.delete(`/api/blog/${article.id}`)
      expect(resp.status).to.equal(401)
    })

    it('Should return error when id is malformed', async () => {
      const resp = await authenticatedAgent.delete('/api/blog/:641a2cbbe8f88f$3bd1a25f8')
      expect(resp.status).to.equal(400)
    })

    it('Should return error if id is valid but doesnt exist', async () => {
      const resp = await authenticatedAgent.delete('/api/blog/641cc001ba31117cbb94bb94')
      expect(resp.status).to.equal(404)
    })

    it('Should delete and return post', async () => {
      const article = await BlogModel.findOne({ status: 'draft' })
      const resp = await authenticatedAgent.delete(`/api/blog/${article.id}`)
      expect(resp.text).to.equal(JSON.stringify(article))
    })
  })

  // BLOG-PUT TESTS
  describe('Blog: PUT ROUTE', () => {
    it('Should require authentication', async () => {
      const article = await BlogModel.findOne()
      const body = { content: 'modified content' }
      const resp = await agent.put(`/api/blog/${article.id}`, body)
      expect(resp.status).to.equal(401)
    })

    it('Should return error when id is malformed', async () => {
      const body = { content: 'modified content' }
      const resp = await authenticatedAgent.put('/api/blog/:641a2cbbe8f88f$3bd1a25f8', body)
      expect(resp.status).to.equal(400)
    })

    it('Should return error if id is valid but doesnt exist', async () => {
      const body = { content: 'modified content' }
      const resp = await authenticatedAgent.put('/api/blog/641cc001ba31117cbb94bb94', body)
      expect(resp.status).to.equal(404)
    })

    it('Should return an error if agent modified ID', async () => {
      const article = await BlogModel.findOne()

      let body = { id: '641cc001ba31117cbb94bb94' }
      const resp = await authenticatedAgent.put(`/api/blog/${article.id}`, body)
      expect(resp.status).to.equal(401)

      body = { _id: '641cc001ba31117cbb94bb94' }
      const resp1 = await authenticatedAgent.put(`/api/blog/${article.id}`, body)
      expect(resp1.status).to.equal(401)
    })

    it('Should accept any property except ID', async () => {
      const article = await BlogModel.findOne()

      let body = { status: 'draft', author: ['zeim839'], subtitle: 'my draft' }
      const resp = await authenticatedAgent.put(`/api/blog/${article.id}`, body)
      expect(resp.status).to.equal(200)

      body = { content: 'more edits...', title: 'test post!' }
      const resp1 = await authenticatedAgent.put(`/api/blog/${article.id}`, body)
      expect(resp1.status).to.equal(200)
    })

    it('Should accept empty body', async () => {
      const id = await BlogModel.findOne()
      const resp = await authenticatedAgent.put(`/api/blog/${id.id}`)
      expect(resp.status).to.equal(200)
    })

    it('Should modify existing posts', async () => {
      const id = await BlogModel.findOne()
      const body = { title: 'post has been modified' }
      const resp = await authenticatedAgent.put(`/api/blog/${id.id}`, body)

      const modified = await BlogModel.findOne({ id: id.id })
      expect(resp.text).to.equal(JSON.stringify(modified))
    })
  })

  // BLOG-POST TESTS
  describe('Blog: POST ROUTE', () => {
    it('Should require authentication', async () => {
      const body = { title: 'test post', status: 'published' }
      const resp = await agent.post('/api/blog/', body)
      expect(resp.status).to.equal(401)
    })

    it('Should require title and status', async () => {
      const body = { content: 'my article' }
      const resp = await authenticatedAgent.post('/api/blog/', body)
      expect(resp.status).to.equal(400)

      const respJson = JSON.parse(resp.text)
      expect(respJson).to.have.property('error')
      expect(respJson.error === 'Missing field(s) in request body').to.equal(true)
    })

    it('Should not allow ID to be set', async () => {
      const body = { id: '11111', title: 'test post', status: 'published' }
      const resp = await authenticatedAgent.post('/api/blog/', body)
      expect(resp.status).to.equal(401)
    })

    it('Should create and return created blog post', async () => {
      const body = { title: 'test post', status: 'published', content: 'my article' }
      const resp = await authenticatedAgent.post('/api/blog/', body)

      expect(resp.status).to.equal(200)
      const post = await BlogModel.findById(JSON.parse(resp.text)._id)
      const parsed = JSON.parse(resp.text)

      // Keys are in different order.
      for (const key in parsed) {
        expect(JSON.stringify(parsed[key])).to.equal(JSON.stringify(post[key]))
      }
    })
  })
})
