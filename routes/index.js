var express = require('express');
var router = express.Router();
var Kind = require('../model/kind');
/* GET home page. */
router.get('/', function(req, res, next) {
	
	Kind.find()
	.populate({
		path: 'movies',
		select: 'title sellprice url',
		options: {
			limit: '2'
		}
	})
	.exec(function (err, kinds) {
		if (err) {
			console.log(err);
		}
		console.log(kinds)
    	res.render('index', { title: 'index', movies: kinds });
	});
});

module.exports = router;
