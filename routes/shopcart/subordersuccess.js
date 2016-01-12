var express = require('express');
var router = express.Router();
var Order = require('../../model/order');
router.get('/', function(req, res, next) {
	res.render('subordersuccess', { title: 'Subordersuccess'});
});
router.post('/', function(req, res, next) {
	var order = req.body.order;
		order = Array.isArray(order) ? order : [order];
		
	if (order) {
		order.forEach(function(val, index){
			
			Order.update({_id: val}, {$set: {pay: '1'}}).exec(function(err, order) {
				if (err) {
					console.log(err);
				} else {
					console.log(order);
					res.redirect('/shop/subordersuccess');
				}
			});
		});
	}
	
});

module.exports = router;
