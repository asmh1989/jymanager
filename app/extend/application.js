/**
 * Created by sun on 2017/3/30.
 */
'use strict';

const password = Symbol('Application#pwd');
const password2 = Symbol('Application#pwd2');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$');

module.exports = {
	async pwd() {
		if (!this[password]) {
			let accountModel = this.model.Account;
			let result = await this.findOne(accountModel, { username: 'admin' });
			if(result){
				this[password] = result.password;
			} else {
				let passwd = bcrypt.hashSync('sunminhua', 8);
				await this.save(accountModel, {
					username:'admin',
					password: passwd,
					permission: 0
				}, {username: 'admin'})
				
				this[password] = passwd;
			}
		}
		return this[password];
	},

	async defaultPwd(){
		if(!this[password2]){
			this[password2] = bcrypt.hashSync('123456', 8);
		}

		return this[password2];
	},

	generateId(){
		return shortid.generate();
	},

	isValid(id){
		return shortid.isValid(id);
	},

	async save(model, data, ifParams) {
		const { ctx } = this;
		return new Promise((resolve, reject) => {
			model.findOne(ifParams, (err, doc) => {
				if (err) {
					reject(err);
				}
				else {
					if (doc) {
						doc = Object.assign(doc, data);
						doc.save();
						resolve();
					} else {
						new model(data).save((err, doc) => {
							if (err) {
								reject(err);
							} else {
								resolve();
							}
						});
					}

				}
			})
		}).then(() => {
			return null;
		}).catch((err) => {
			return err;
		})
	},

	async findOne(model, ifPramrs) {
		return new Promise((resolve, reject) => {
			model.findOne(ifPramrs, (err, doc) => {
				if (err) {
					reject(err);
				} else {
					resolve(doc);
				}
			}).then(doc => {
				return doc;
			}).catch(err => {
				return null;
			});
		})
	},
};

global.Date.prototype.yyyymmddhhmmss = function () {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
	var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
	var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
	return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);
};

global.Date.prototype.yyyymmdd = function () {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	return "".concat(yyyy).concat(mm).concat(dd);
};

global.Date.prototype.buildDate = function () {
	return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`
};
