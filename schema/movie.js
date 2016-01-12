var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
	kind: String,
	title: String,
	dirs: String,
	url: String,
	banner: String,
	year: Number,
	sellprice: Number,
	pv: {
		type: Number,
		default: 0
	},
	mate: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
movieSchema.pre('save', function(next) {

	console.log(this.isNew)
	if (this.isnow) {
		this.mate.createAt = this.mate.updateAt = Date.now();
	} else {
		this.mate.updateAt = Date.now();
	}
	console.log('saved');
	next();
});
movieSchema.static.find = function(cb) {
	return this.find().exec(cb);
};
movieSchema.statics.fetch = function(cb) {
	return this.find({}).exec(cb);
};
movieSchema.statics.findById = function(id, cb){
	return this.findOne({_id: id}, cb)
};
movieSchema.statics.delOne = function(id, cb) {
	return this.remove({_id: id}, cb);
}
module.exports = movieSchema;