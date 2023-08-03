/* global describe, it, before, after */

const chai = require('chai')
const { app, stop } = require('../app')
const chaiHttp = require('chai-http')
const TestHelper = require('./test-helper')
const expect = chai.expect
const UserModel = require('../model/users').UserModel
const auth = require('../auth/auth')
const ENV = require('../utils/config').ENV

chai.use(chaiHttp)
let helper = null

describe('Users Route', () => {
  before(async () => {
    expect(ENV === 'development').to.equal(true)
    const user = await UserModel.findOne({ username: 'admin' })
    helper = new TestHelper(chai, app, auth.tokenizeUser(user))
  })

  after(stop)

  // USERS-GET TESTS
  describe('Users: GET ROUTE', () => {
    it('Should return users; admins should be first', async () => {
      const users = await helper.get('/api/users/')
      const dbUsers = await UserModel.find({}, null, { limit: 20 }).sort({ isAdmin: -1 }).exec()
      for (let i = 0; i < dbUsers.length; i++) {
        dbUsers[i].password = undefined
      }

      expect(users.text).to.equal(JSON.stringify(dbUsers))
    })

    it('Should never return more than 20 users', async () => {
      const users = await helper.get('/api/users/')
      expect(JSON.parse(users.text)).to.have.lengthOf.below(21)
    })

    it('Should not return user password', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      for (let i = 0; i < users.length; i++) {
        expect(users[i]).to.not.have.property('password')
      }
    })

    it('API returns expected data after inserting users to DB', async () => {
      const newUser = {
        username: 'inserted_user',
        password: 'password',
        isAdmin: true,
        role: 'test'
      }

      const user = await helper.post('/api/users/', newUser)
      expect(user.status).to.equal(200)

      const resp = await helper.get('/api/users/')
      expect(resp.status).to.equal(200)

      let found = false
      const users = JSON.parse(resp.text)
      for (const i in users) {
        if (users[i].username === 'inserted_user') {
          found = true
          break
        }
      }
      expect(found).to.equal(true)
    })
  })

  // USERS-GET-ID TESTS
  describe('Users: GET ID ROUTE', () => {
    it('Returns an error when user ID is malformed', async () => {
      const resp = await helper.get('/api/users/:641a2cbbe8f88f$3bd1a25f8')
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when user ID does not exist', async () => {
      const resp = await helper.get('/api/users/641cc001ba31117cbb94bb94')
      expect(resp.status).to.equal(404)
    })

    it('Does not return user password', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const userID = users[0]._id

      const resp = await helper.get(`/api/users/${userID}`)
      expect(resp.status).to.equal(200)
      expect(JSON.parse(resp.text)).to.not.have.property('password')
    })
  })

  // USERS-CREATE-NEW-USER TESTS
  describe('Users: POST ROUTE', () => {
    it('Returns an error when no username is provided', async () => {
      const newUser = {
        username: '',
        password: '123456',
        isAdmin: true,
        role: 'test'
      }
      const resp = await helper.post('/api/users/', newUser)
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when no password is provided', async () => {
      const newUser = {
        username: 'test',
        password: '',
        isAdmin: true,
        role: 'test'
      }
      const resp = await helper.post('/api/users/', newUser)
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when password object is not a string', async () => {
      const newUser = {
        username: 'test',
        password: 123456,
        isAdmin: true,
        role: 'test'
      }
      const resp = await helper.post('/api/users/', newUser)
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when attempting to manually assign an ID', async () => {
      const newUser = {
        username: 'hacker1',
        password: 'password',
        isAdmin: true,
        role: 'test',
        _id: '19660302'
      }

      const resp = await helper.post('/api/users/', newUser)
      expect(resp.status).to.equal(401)
    })

    it('Returns an error when username is already taken', async () => {
      const newUser = {
        username: 'admin',
        password: 'password',
        isAdmin: true,
        role: 'test'
      }

      const resp = await helper.post('/api/users/', newUser)
      expect(resp.status).to.equal(400)
    })

    it('Returns correct information after inserting new users with random data', async () => {
      const newUser = {
        username: 'testing',
        password: 'password',
        isAdmin: true,
        role: 'test'
      }

      const resp = await helper.post('/api/users/', newUser)
      expect(resp.status).to.equal(200)

      const body = resp.body

      // Should not return password.
      expect(body).to.not.have.property('password')

      expect(body.username).to.equal(newUser.username)
      expect(body.role).to.equal(newUser.role)
      expect(body.isAdmin).to.equal(newUser.isAdmin)
    })
  })

  // USERS-DELETE-USER TESTS
  describe('Users: DELETE ROUTE', () => {
    it('Returns an error when user ID is malformed', async () => {
      const resp = await helper.delete('/api/users/:641a2cbbe8f88f$3bd1a25f8')
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when user ID does not exist', async () => {
      const resp = await helper.delete('/api/users/641cc001ba31117cbb94bb94')
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when trying to delete the username: admin', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      let adminID = 0

      for (const i in users) {
        if (users[i].username === 'admin') {
          adminID = users[i]._id
        }
      }
      expect(adminID).to.not.equal(0)

      const resp = await helper.delete(`/api/users/${adminID}`)
      expect(resp.status).to.equal(401)
    })

    it('User password is not returned.', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const deletedID = users[1]._id

      const resp = await helper.delete(`/api/users/${deletedID}`)

      expect(resp.status).to.equal(200)
      expect(JSON.parse(resp.text)).to.not.have.property('password')
    })
  })

  // USER-EDIT-USER TESTS
  describe('Users: PUT ROUTE', () => {
    it('Returns an error when attempting to change ID', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const adminID = users[0]._id

      const resp = await helper.put(`/api/users/${adminID}`, { _id: '121' })
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when user ID is malformed', async () => {
      const resp = await helper.put('/api/users/:641a2cbbe8f88f$3bd1a25f8')
      expect(resp.status).to.equal(400)
    })

    it('Returns an error when user ID does not exist', async () => {
      const resp = await helper.put('/api/users/641cc001ba31117cbb94bb94')
      expect(resp.status).to.equal(404)
    })

    it('Should work even when request body is empty', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const adminID = users[0]._id

      const resp = await helper.put(`/api/users/${adminID}`, {})
      expect(resp.status).to.equal(200)
    })

    it('Non-schema keys in request.body do not get processed', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const adminID = users[0]._id

      const resp = await helper.put(`/api/users/${adminID}`, { test_key: true })
      expect(resp.status).to.equal(200)
      expect(resp.text).to.equal(JSON.stringify(users[0]))
    })

    it('Returns an error if user tries to change username to admin', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const userID = users[0]._id

      const resp = await helper.put(`/api/users/${userID}`, { username: 'admin' })
      expect(resp.status).to.equal(401)
    })

    it('Returns an error if user tries to claim an existing username', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const userID = users[0]._id

      const resp = await helper.put(`/api/users/${userID}`, { username: 'jannie123' })
      expect(resp.status).to.equal(400)
    })

    it('API does not return user password', async () => {
      let users = await helper.get('/api/users/')
      users = JSON.parse(users.text)
      const userID = users[0]._id

      const resp = await helper.put(`/api/users/${userID}`, {})
      expect(resp.status).to.equal(200)
      expect(JSON.parse(resp.text)).to.not.have.property('password')
    })
  })
})
