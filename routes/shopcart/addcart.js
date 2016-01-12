var express = require('express');
var router = express.Router();
var Movie = require('../../model/movie');
var Cart = require('../../model/cart');
var _ = require('underscore');

// add cart
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var user = req.session.user;
	var userId;
	var _cart;

	var getCart = function(cart, arrCart) {
		var re;
		arrCart = Array.isArray(arrCart) ? arrCart : [arrCart];

		arrCart.forEach(function(e, i) {
			console.log(e.movie._id == id)
			if (e.movie._id == id) {
				re = e;
			}
		});

		return re ? re : null;

	}
	// login
	if (user && id) {
		userId = user._id;

		if (id) {
			Cart.findCart(userId, function(err, cart) {
				if (err) {
					console.log(err);
				} else if (cart) {
					_cart = getCart(id, cart);		
					console.log(_cart)
					if (_cart) {   // update
						_cart.count += 1;
						_cart.save(function(err, cart) {
							if (err) {
								console.log(err);
							} 
							res.redirect('/cart');
						});
					} else {
						_cart = new Cart({
							user: userId,
							movie: id,
							count: 1
						});
						_cart.save(function(err, cart) {
							if (err) {
								console.log(err);
							} 
							res.redirect('/cart');
						});
					}
					
					
				}
				
			});
		}
	} else {
		res.redirect('/login/in');
	}
	
});
module.exports = router;