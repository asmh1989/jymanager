'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const AppSchema = new mongoose.Schema({
		username: { type: String },
		token: { type: String},
		date: { type: Date, default: Date.now },
        time:{ type: Number},
	});

	return mongoose.model('token', AppSchema);
};