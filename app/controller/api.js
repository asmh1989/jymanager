'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async test() {
      this.ctx.body = 'api test';
    }

    async login() {
        
    }

    

  }
  return HomeController;
};