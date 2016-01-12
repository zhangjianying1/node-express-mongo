var express = require('express');
var router = express.Router();
var User = require('../model/user');
var url = require('url');

router.get('/', function (req, res, next) {
	res.render('login', {title: 'Login'});
});

router.post('/', function (req, res, next) {
	var body = req.body;
	var name = body.name;
	var password = body.password;
	var sUrl;

	if (name) {
		User.findName(name, function (err, user) {
			console.log(user)
			if (err) {
				console.log(err);
			} else if (!user) {
				res.redirect('/login/in');
			} else {
				user.isMatching(password, function (err, match) {
					if (err) {
						console.log(err);
					} else if (match) {
						req.session.user = user;
						res.redirect('/');
					} else {
						res.redirect('/login/in');
					}
				});
			}
		});
	} else {
		res.redirect('/login/in');
	}
});

module.exports = router;