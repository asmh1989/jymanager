'use strict';

module.exports = app => {
  // app.get('/', 'home.index');
  app.get('/api/test', 'api.test');
  app.get('/api/login', 'api.login');
  app.get('/api/token/:token', 'api.checkToken');
};
