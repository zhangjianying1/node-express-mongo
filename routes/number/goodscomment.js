var express = require('express');
var router = express.Router();
var Order = require('../../model/order');
var Comment = require('../../model/comment');


router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	if (id) {
		Order.findOne({_id:id}).
			populate('movie', '_id').
			populate('user', '_id').
			exec(function(err, order) {
				
				if (err) {
					console.log(err);
				}
				res.render('goodscomment', {title: 'Comment', order: order});
			});
	} else {
		res.redirect('/number');
	}
});

router.post('/', function(req, res, next){
	var body = req.body;
	var movie = body.movie;

	if (body.replyuser) {
		
		Comment.findById(body.commentid, function(err, comment) {
			var reply;

			if (err) {
				console.log(err);
			} else {
				reply = {
					from: body.user,
					to: body.replyuser,
					content: body.content
				};
				comment.replys.push(reply);	

				comment.save(function(err, comment){
					if (err) {
						console.log(err);
					} else {

						res.redirect('/detail/' + movie);
					}

				});
			}
		});
		
	} else {
		var _comment = new Comment({
			movie: movie,
			from: body.user,
			content: body.content
		});	
		
		_comment.save(function(err, comment){
			if (err) {
				console.log(err);
			} else {
				res.redirect('/detail/' + movie);
			}

		});
	}
	
});
module.exports = router;