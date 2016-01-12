var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderSchema = new mongoose.Schema({
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
	pay: {
		type: String,
		defatule: '0'
	},
	comment: {
		type: String,
		default: '0'
	},
	takestatus: {
		type: String,
		default: '0'
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

OrderSchema.pre('save', function(next){
	if (this.isNew) {
		this.create = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	console.log('saved')
	next();
});


OrderSchema.statics = {
	
	findById: function(id, cb) {
		return this.find({_id: id})
		.populate('movie')
		.exec(cb);
	},
	fetch: function(cb) {
		return this.find({})
			.populate('movie').
			exec(cb);
	},
	delOrder: function(id, cb) {
		return this.remove({_id: id}, cb);
	}
};
module.exports = OrderSchema;