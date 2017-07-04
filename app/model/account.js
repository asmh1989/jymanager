'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const AppSchema = new mongoose.Schema({
		username: { type: String },
		password: { type: String },
		date: { type: Date, default: Date.now },
		userid: {type: String, default:''},
        permission:{type: Number, default: 100},    // 权限, 0: 管理员权限
        enable: {type: Boolean, default: true},     // 删除, 通过改标识来代表
	});

	return mongoose.model('account', AppSchema);
};