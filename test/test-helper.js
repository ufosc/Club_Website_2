exports.module = class {
    constructor(chai, app, userToken = null) {
      this.chai = chai;
      this.app = app;
      this.userToken = userToken;
    }
  
    async get(url) {
      return this.chai.request(this.app)
        .get(url)
        .auth(this.userToken, { type: 'bearer' });
    }
  
    async post(url, body = {}) {
      if (!this.userToken) {
        return this.chai.request(this.app)
          .post(url)
          .send(body);
      }
  
      return this.chai.request(this.app)
        .post(url)
        .auth(this.userToken, { type: 'bearer' })
        .send(body);
    }
  
    async put(url, body = {}) {
      return this.chai.request(this.app)
        .put(url)
        .auth(this.userToken, { type: 'bearer' })
        .send(body);
    }
  
    async patch(url, body = {}) {
      return this.chai.request(this.app)
        .patch(url)
        .auth(this.userToken, { type: 'bearer' })
        .send(body);
    }
  
    async delete(url) {
      return this.chai.request(this.app)
        .delete(url)
        .auth(this.userToken, { type: 'bearer' })
        .send();
    }
  };

  
