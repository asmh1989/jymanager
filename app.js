'use strict';


// app.js
module.exports = app => {

	// app.beforeStart(()=>{
	//
	// });

	app.messenger.on('egg-ready', () => {
		app.logger.info('app egg-ready, pid = ', process.pid);
	});

};
