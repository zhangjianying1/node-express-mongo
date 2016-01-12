exports.isLogin = function(req, res, next){
	var user = req.session.user;
	if (!user) {
		res.redirect('/');
	}
	next();
};
exports.isAuthority = function(req, res, next){
	var user = req.session.user;
	var role = user.role;
	if (role < 10) {
		res.redirect('/');
	}
	next();
};