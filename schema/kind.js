var mongoose = require('mongoose');
var KindSchema = new mongoose.Schema({
	name: String,
	movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
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
// KindSchema.pre('save', function(next) {
// 	if (this.isNew) {
// 		this.mate.crateAt = this.mate.updateAt = Date.now();
// 	} else {
// 		this.updateAt = Date.now();
// 	}
// 	next();
// })
KindSchema.statics = {

}
module.exports = KindSchema;