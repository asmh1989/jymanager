'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const AppSchema = new mongoose.Schema({
		date: { type: Date, default: Date.now },
        stores:{ type: Array, default: [] },
	});

	return mongoose.model('info', AppSchema);
};