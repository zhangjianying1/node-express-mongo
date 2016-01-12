var mongoose = require('mongoose');
var CartSchema = require('../schema/cart');
var Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;