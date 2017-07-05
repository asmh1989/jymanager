'use strict';
const qiniu = require('qiniu');
const config = new qiniu.conf.Config();
const accessKey = 'WM-Vk9mzORu_-CFLV91AIdpLXC7zNEJ18pL7xPSy';
const secretKey = 'NMNnzx5JEN9r_wIB0Ck8QC-UWu8Eq7n7vf5Omgkl';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'jymanager',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

module.exports = app => {
  // app.get('/', 'home.index');
  app.context.oss = {
    put(name, stream) {
      return new Promise(resolve => {
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        formUploader.putStream(uploadToken, name, stream, putExtra, function (respErr,
          respBody, respInfo) {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            console.log(respBody);
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
          }
          resolve(respBody.key);
        });

      });
    },
  };

  app.get('/api/test', 'api.test');
  app.get('/api/login', 'api.login');
  app.get('/api/token/:token', 'api.checkToken');
  app.post('/api/upload', 'api.upload');
};
