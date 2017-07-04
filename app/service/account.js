'use strict';
const bcrypt = require('bcrypt');

module.exports = app => {
    class account extends app.Service {
        async Signin(username, password, remember) {
            const { app, ctx } = this;
            let accountModel = app.model.Account;

            await app.pwd();
            let result = await app.findOne(accountModel, { username });
            if (!result) {
                ctx.body = {
                    ret: 1,
                    msg: `用户不存在`,
                }
            } else {
                let correct = bcrypt.compareSync(password, result.password);
                if (correct) {
                    //生成个token 返回
                    let tokenModel = app.model.Token;
                    let sid = app.generateId();
                    ctx.body = {
                        ret: 0,
                        token: sid,
                    }

                    await app.save(tokenModel, {username: username, token: sid, time: remember ? 7*24*3600: 0, date: new Date()});
                    
                } else {
                    ctx.body = {
                        ret: 2,
                        msg: '密码错误'
                    }
                }
            }
        }
    }

    return account;
};
