var express = require('express');
var router = express.Router();
var Cart = require('../../model/cart');
var Order = require('../../model/order');

// quick buy
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var user = req.session.user;
	var userId;
	var _order; 

	// login
	if (user) {
		userId = user._id;

		if (id) {
			_order = new Order({
				user: userId,
				movie: id,
				count: 1,
				buy: '1',
				pay: '0'
			});
			_order.save(function(err, order) {
				if (err) {
					console.log(err);
				} else if (order) {
					//console.log(usershop)
				}
				
				res.redirect('/shop/suborder/' + order._id);
			});
		}
	} else {
		res.redirect('/login/in');
	}
	
});

// cart buy
router.post('/', function(req, res, next) {
	var cartId = req.body.cartid;
	var orderArr = [];
	cartId = Array.isArray(cartId) ? cartId : [cartId];
	
	if (Array.isArray(cartId)) {
		cartId.forEach(function(val, index) {
			Cart.findOneCart(val, function(err, cart) {

				if (err) {
					cosnole.log(err);
				} else if (cart) {
					
					_order = new Order({
						user: cart[0].user,
						movie: cart[0].movie._id,
						count: cart[0].count,
						pay: '0'
					});
					_order.save(function(err, order) {
						if (err) {
							console.log(err);
						} 
						orderArr.push(order._id);
						if (index == cartId.length -1) {
							res.redirect('/shop/suborder/' + orderArr);
						}
					});
				}
			});	
		});
	}
});
module.exports = router;