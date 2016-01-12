var express = require('express');
var router = express.Router();
var url = require('url');
router.get('/', function(req, res, next) {
	var user = req.session.user;

	if (user) {
		delete req.session.user;
	}
	
	res.redirect(req.headers['referer']);
});

module.exports = router;
