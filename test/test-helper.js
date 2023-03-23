class TestHelper {
  constructor (chai, app, userToken = null) {
    this.chai = chai
    this.app = app
    this.userToken = userToken
  }

  async get (url) {
    return this.chai.request(this.app)
      .get(url)
      .set('Cookie', `jwt=${this.userToken}`)
  }

  async post (url, body = {}) {
    return this.chai.request(this.app)
      .post(url)
      .set('Cookie', `jwt=${this.userToken}`)
      .send(body)
  }

  async put (url, body = {}) {
    return this.chai.request(this.app)
      .put(url)
      .set('Cookie', `jwt=${this.userToken}`)
      .send(body)
  }

  async patch (url, body = {}) {
    return this.chai.request(this.app)
      .patch(url)
      .set('Cookie', `jwt=${this.userToken}`)
      .send(body)
  }

  async delete (url) {
    return this.chai.request(this.app)
      .delete(url)
      .set('Cookie', `jwt=${this.userToken}`)
      .send()
  }
}

module.exports = TestHelper
