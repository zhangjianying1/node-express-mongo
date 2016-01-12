var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CommentSchema = new Schema({
	movie: String,
	from: {
		type: ObjectId,
		ref: 'User'
	},
	replys: [{
		from: {
			type: ObjectId,
			ref: 'User'
		},
		to: {
			type: ObjectId,
			ref: 'User'
		},
		content: String
	}],
	content: String,
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
CommentSchema.pre('save', function(next) {
	if (this.isNew) {
		this.mate.updateAt = this.mate.createAt = Date.now();
	} else {
		this.mate.updateAt = Date.now();
	}
	console.log('saved');
	next();
});
CommentSchema.statics = {
	fetchId: function(movie, cb) {
		return this.find({movie: movie}).
			populate('from', 'name').
			populate('replys.from replys.to', 'name').
			sort('mate.updateAt').
			exec(cb);
	},
	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb);
	},
	removeAll: function(cb){
		return this.remove().exec(cb);
	}
};
module.exports = CommentSchema;