var mongoose = require('mongoose');
var crypto = require('crypto');
var hash = crypto.createHash('sha1');
var userSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	email: {
		unique: true,
		type: String
	},
	password: String,
	registerAt: {
		type: Date,
		default: Date.now()
	},
	loginAt: {
		type: Date,
		default: Date.now()
	},
	role: 0 
});
userSchema.pre('save', function(next) {
	hash.update(this.password);
	this.password = hash.digest('hex');
	next();
});
userSchema.methods.isMatching = function (psd, db) {
	var hash = crypto.createHash('sha1');
	hash.update(psd);

	if (this.password === hash.digest('hex') ) {
		db(null, true);
	} else {
		db(null, false);
	}
	
};
userSchema.statics = {
	fetch: function(cb) {
		return this.find().exec(cb);
	},
	findName: function(name, cb) {
		return this.findOne({name: name}).exec(cb)
	},
	delUser: function(id, cb) {
		return this.remove({_id: id}, cb);
	}
};
module.exports = userSchema;