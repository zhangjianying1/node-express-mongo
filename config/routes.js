var role = require('../config/role');

// index
var routes = require('../routes/index');
var movielist = require('../routes/movielist');
var admin = require('../routes/admin');
var kind = require('../routes/kind');
var adminnew = require('../routes/adminnew');
var adminlist = require('../routes/adminlist');
var detail = require('../routes/detail');
var edit = require('../routes/edit');
var del = require('../routes/delete');
var register = require('../routes/register');
var userlist = require('../routes/userlist');
var userdel = require('../routes/userdel');
var login = require('../routes/login');
var loginout = require('../routes/loginout');
// add cart
var addcart = require('../routes/shopcart/addcart');
var cart = require('../routes/shopcart/cart');
var cartdel = require('../routes/shopcart/cartdel');
var buy = require('../routes/shopcart/buy');
var suborder = require('../routes/shopcart/suborder');
var subordersuccess = require('../routes/shopcart/subordersuccess');

// number
var number = require('../routes/number/index');
var orderdel = require('../routes/number/orderdel');
var goodscomment = require('../routes/number/goodscomment');
module.exports = function(app) {
	app.use(function (req, res, next) {
		var user = req.session.user;

		if (user) {
			app.locals.user = user;
		} else {
			delete app.locals.user;
		}
		next();
	});

	app.use('/', routes);
	app.use('/movie/list', movielist);
	app.use('/detail', detail);
	app.use('/register', register);
	app.use('/login/in', login);	
	app.use('/login/out', loginout);

	// admin	
	app.use('/admin', role.isLogin, role.isAuthority, admin);
	app.use('/admin/kind', role.isLogin, role.isAuthority, kind);
	app.use('/admin/new', role.isLogin, role.isAuthority, adminnew);
	app.use('/admin/list', role.isLogin, role.isAuthority, adminlist);
	app.use('/admin/edit', role.isLogin, role.isAuthority, edit);
	app.use('/admin/del', role.isLogin, role.isAuthority, del);
	app.use('/user/list', role.isLogin, role.isAuthority, userlist);
	app.use('/user/del', role.isLogin, role.isAuthority, userdel);

	// Cart
	app.use('/movie/buy', buy);
	app.use('/cart/add', addcart);
	app.use('/cart', cart);
	app.use('/cart/del', role.isLogin, cartdel);
	app.use('/shop/suborder', role.isLogin, suborder);
	app.use('/shop/subordersuccess', subordersuccess);
	
	// Number
	app.use('/number', role.isLogin, number);
	app.use('/order/del', role.isLogin, orderdel);
	app.use('/goodscomment', role.isLogin, goodscomment);
}
