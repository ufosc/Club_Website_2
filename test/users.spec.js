const chai = require('chai')
const {app, stop} = require('../app')
const chaiHttp = require('chai-http')
const TestHelper = require('./test-helper')
const seed = require('../utils/seed')
const expect = chai.expect

chai.use(chaiHttp);

describe('Users Route', () => {
    beforeEach(seed);
    after(stop) 
    it('Should return users', () => {

    })
})