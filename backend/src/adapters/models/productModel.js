const mongoose = require('mongoose');
var Schema = mongoose.Schema
const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    categoryId: { type: Schema.ObjectId,required:true },
    aboutProduct: { type: String },
    isListed: { type: Boolean, required: true },
    waranty: { type: Number },
    isDeleted: { type: Boolean, required: true }
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;