const mongoose = require('mongoose');
const Schema = mongoose.Schema
const OrderSchema = new mongoose.Schema({
    userId: { type: Schema.ObjectId, required: true },
    orderAmount: { type: Number, required: true },
    deliveryAddress: { type: Object, required: true },
    orderDate: { type: String, required: true },
    orderStatus: { type: String, required: true },
    deliveryDate: { type: String },
    shippingDate: { type: String },
    orderedItems: { type: Array, required: true },
    coupon: { type: String },
    offer: { type: String },
    transactionId: { type: String },


});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;