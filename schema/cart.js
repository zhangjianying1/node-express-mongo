var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CartSchema = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User'
	},
	movie: {
		type: ObjectId,
		ref: 'Movie' 
	},
	count: {
		type: Number,
		default: 0
	},
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	}
});

CartSchema.pre('save', function(next){
	if (this.isNew) {
		this.create = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	console.log('saved')
	next();
});
CartSchema.methods = {
	finduser: function(id, cb) {
		return this.find({_id: id})
		.populate('movie')
		.exec(cb);
	}	
}

CartSchema.statics = {
	findCart: function(id, cb) {
		return this.find({user: id})
		.populate('movie')
		.exec(cb);
	},
	findOneCart: function(id, cb) {
		return this.find({_id: id})
		.populate('movie')
		.exec(cb);
	},
	delShop: function(id, cb) {
		return this.remove({_id: id}, cb);
	}
};
module.exports = CartSchema;