'use strict';
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const co = require('co');

module.exports = app => {
  class HomeController extends app.Controller {
    async test() {
      this.ctx.body = 'api test';
    }

    async login() {
      const { ctx, service } = this;
      let username = ctx.query.username;
      let password = ctx.query.password;
      let remember = ctx.query.remember;

      await service.account.Signin(username, password, remember);
    }

    async checkToken() {
      const { ctx, service } = this;
      let token = ctx.params.token;
      let data = ctx.query.data;

      await service.account.tokenCheck(token, data);
    }

    async upload() {
      const { ctx, service } = this;
      const stream = await ctx.getFileStream();
      const name = app.generateId()+'_' + path.basename(stream.filename);
      let result;
      try {
        // process file or upload to cloud storage
        result = await ctx.oss.put(name, stream);
      } catch (err) {
        // must consume the stream, otherwise browser will be stuck.
        await sendToWormhole(stream);
        throw err;
      }

      ctx.body = {
        url:result,
      };
    }

  }
  return HomeController;
};