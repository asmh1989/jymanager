'use strict';

const path = require('path');

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1499049309288_3975';

    // add your config here

    // config.static = {
    //   // maxAge: 31536000,
    //   prefix: '/website/',
    //   dir: path.join(appInfo.baseDir, 'web/build')
    // };

    config.security = {
        csrf: {
            enable: false
        },
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/jymanager',
        options: {}
    };

    return config;
};
