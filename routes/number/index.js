var express = require('express');
var router = express.Router();
var Order = require('../../model/order');

router.get('/', function(req, res, next) {
	var user = req.session.user;

	
	Order.fetch(function(err, order) {
		if (err) {
			console.log(err);
		} else if (order) {
			console.log(order[0])
			res.render('numberindex', {title: 'number center', orders: order});
		}
	});
});
module.exports = router;