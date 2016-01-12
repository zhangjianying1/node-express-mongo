var express = require('express');
var router = express.Router();
var Order = require('../../model/order');
var _ = require('underscore');

router.get('/:id', function(req, res, next) {
	var orders = [];
	var total = 0;
	var id = req.params.id;
	var userId = req.session.user && req.session.user._id;
	id = id.split(',');
	id = Array.isArray(id) ? id : [id];
	id.forEach(function(val, index) {
		
		Order.findById(val, function(err, order) {

			if (err) {
				console.log(err);
			} else if (order){
				orders.push(order[0]);
				total += parseFloat(order[0].count * order[0].movie.sellprice);
				
				if (index == id.length - 1) {
    				res.render('suborder', {title: 'success', orders: orders, total: total});
				}
			}
		});
	});

	
});


module.exports = router;