var mongoose = require('mongoose');
var OrderSchema = require('../schema/order');
var Order = mongoose.model('order', OrderSchema);
module.exports = Order;