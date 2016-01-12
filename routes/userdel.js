var express = require('express');
var router = express.Router();
var User = require('../model/user');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log(req.params)
	if (id) {
		User.delUser(id, function(err, user) {
			if (err) {
				console.log(err);
			} 
			res.redirect('/user/list');
		});
	}
});
module.exports = router;