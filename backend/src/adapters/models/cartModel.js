const mongoose = require('mongoose');
var Schema = mongoose.Schema
const CartSchema = new mongoose.Schema({
    userId: { type: Schema.ObjectId, required: true },
    products: { type: Array },
   

});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;