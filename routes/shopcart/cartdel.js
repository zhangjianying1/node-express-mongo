var express = require('express');
var router = express.Router();
var Cart = require('../../model/cart');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	if (id) {
		Cart.delShop(id, function(err, cart) {
			if (err) {
				console.log(err);
			} 
			res.redirect('/cart');
		});
	} else {
		res.redirect('/cart');
	}
});
module.exports = router;