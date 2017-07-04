'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async test() {
      this.ctx.body = 'api test';
    }

    async login() {
        const {ctx, service} = this;
        let username = ctx.query.username;
        let password = ctx.query.password;
        let remember = ctx.query.remember;

        await service.account.Signin(username, password, remember);
    }

    

  }
  return HomeController;
};