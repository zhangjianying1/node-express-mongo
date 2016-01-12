var express = require('express');
var app = express();
var router = express.Router();
var User = require('../model/user');

var expressSession = require('express-session');

router.get('/',  function(req, res, next) {
	res.render('register', {title: 'Registr'})
});

router.post('/',  function(req, res, next) {
	var body = req.body;
	var _user;

	if (body.name && body.email && (body.password === body.repeatpassword)) {
		
		User.findName(body.name, function(err, user) {
			if (err) {
				console.log(err);
			} else if (user) {
				console.log(user)
				res.redirect('/register');
			} else {
				_user = new User(body);

				_user.save(function(err, user){
					if (err) {
						console.log(err);
					} else {
						req.session.user = user;
					}
					
					res.redirect('/user/list');
				});		
			}
		});
		
	}
});
module.exports = router;