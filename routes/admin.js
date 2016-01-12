var express = require('express');
var router = express.Router();
var Kind = require('../model/kind');

router.get('/', function(req, res, next) {
	Kind.find().exec(function(err, kinds) {
		res.render('admin', 
			{title: 'admin', 
			movie: {
				_id:'',
				kind: '',
				title: '',
				dirs: '',
				url: '',
				banner: '',
				year: '',
				sellprice: ''
			},
			kinds: kinds
		});	
	});
});
module.exports = router;
