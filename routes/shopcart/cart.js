var express = require('express');
var router = express.Router();
var Cart = require('../../model/cart');

router.get('/', function(req, res, next) {
	var user = req.session.user;

	if (user) {
		console.log(user)
		Cart.findCart(user._id, function(err, cart) {
			if (err) {
				console.log(err);
			} else {
				
				res.render('cart', {title: 'Cart', carts: cart});
			}
		});
		
	} else {
		res.redirect('/login/in');
	}
});
module.exports = router;