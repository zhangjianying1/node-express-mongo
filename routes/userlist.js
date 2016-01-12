var express = require('express');
var router = express.Router();
var User = require('../model/user');
router.get('/', function (req, res, next) {
	User.fetch(function (err, users) {
		if (err) {
			console.log(err);
		} else if (!users) {
			res.redirect('/');
		}
		res.render('userlist', {title: 'Userlist', users: users});
	});
});
module.exports = router;