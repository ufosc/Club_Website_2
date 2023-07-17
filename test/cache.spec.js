/* global describe, it, before */

const chai = require('chai')
const CacheModule = require('../utils/cache')
const expect = chai.expect
const ENV = require('../utils/config').ENV

describe('Cache Module', () => {
  before(() => {
    expect(ENV === 'development').to.equal(true)
  })

  it('Calls registered callbacks immediately', async () => {
    const cache = new CacheModule()

    const testCallback = () => {
      return { test: true }
    }

    await cache.register(testCallback)
    cache.start(100000000)

    expect(cache.cache()).to.have.property('test')
    expect(cache.cache().test).to.equal(true)
    cache.stop()
  })

  it('Should run callbacks at most once per interval', () => {
    const cache = new CacheModule()

    const testCallback = () => {
      return { test: Date.now() }
    }

    cache.register(testCallback)
    cache.start(100000)

    const dateA = cache.cache().test
    const dateB = cache.cache().test
    expect(dateA).to.equal(dateB)

    cache.stop()
  })

  it('Should stop callback calls with stop()', (done) => {
    const cache = new CacheModule()

    const testCallback = () => {
      return { test: Date.now() }
    }

    cache.register(testCallback)
    cache.start(2)

    const dateA = cache.cache().test
    setTimeout(() => cache.stop(), 3)

    setTimeout(() => {
      const dateB = cache.cache().test
      const dateC = cache.cache().test

      expect(dateA).to.not.equal(dateB)
      expect(dateB).to.equal(dateC)
      done()
    }, 100)
  })
})
