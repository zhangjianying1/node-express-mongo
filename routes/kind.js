var express = require('express');
var router = express.Router();
var Kind = require('../model/kind');

router.get('/', function(req, res, next) {
	Kind.find().exec(function(err, kinds) {
		if (err) {
			console.log(err);
		} else if (kinds.length) {
			res.render('kind', {title: 'Add Kind', kinds: kinds});		
		} else {
			res.render('kind', {title: 'Add Kind'});
		}
	});
	
});

router.post('/', function(req, res, next) {
	var body = req.body;
	var _kind;

	if (body) {
		_kind = new Kind(body);
		_kind.save(function(err, kind) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/admin/kind');
			}
		});
	} else {
		res.redirect('/admin/kind');
	}
});

module.exports = router;