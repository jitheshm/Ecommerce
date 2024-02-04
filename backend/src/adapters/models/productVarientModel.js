const mongoose = require('mongoose');
var Schema = mongoose.Schema
const ProductVarientSchema = new mongoose.Schema({
    productId:{ type: Schema.ObjectId, required: true },
    color:String,
    imagesUrl:Array,
    stock:Number,
    price:Number,
    cost:Number,
    avgRating:Number,
    reviewCount:Number
});


const ProductVarient = mongoose.model('ProductVarient', ProductVarientSchema);

module.exports =ProductVarient;