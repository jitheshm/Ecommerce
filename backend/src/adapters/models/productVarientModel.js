const mongoose = require('mongoose');
var Schema = mongoose.Schema
const ProductVarientSchema = new mongoose.Schema({
    productId: { type: Schema.ObjectId, required: true },
    color: { type: String, required: true },
    imagesUrl: { type: Array },
    stock: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    actualPrice: { type: Number, required: true },
    avgRating: { type: Number },
    reviewCount: { type: Number },
    isDeleted: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});


const ProductVarient = mongoose.model('ProductVarient', ProductVarientSchema);

module.exports = ProductVarient;