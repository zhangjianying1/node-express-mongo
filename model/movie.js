var mongoose = require('mongoose');
var movieSchema = require('../schema/movie');
var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;