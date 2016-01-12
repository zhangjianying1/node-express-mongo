var mongoose = require('mongoose');
var KindSchema = require('../schema/kind');
var Kind = mongoose.model('kind', KindSchema);
module.exports = Kind;