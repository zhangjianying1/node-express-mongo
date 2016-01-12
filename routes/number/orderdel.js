var express = require('express');
var router = express.Router();
var Order = require('../../model/order');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	if (id) {
		
		Order.delOrder(id, function(err, order) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/number');
			}
		});
	} else {
		res.redirect('/number');
	}
	
});
module.exports = router;