const mongoose = require('mongoose');
var Schema = mongoose.Schema
const ProductVarientSchema = new mongoose.Schema({
    productId:{ type: Schema.ObjectId, required: true },
    color:String,
    imagesUrl:Array,
    stock:Number,
    salePrice:Number,
    actualPrice:Number,
    avgRating:Number,
    reviewCount:Number,
    isDeleted:{ type: Boolean, required: true }
});


const ProductVarient = mongoose.model('ProductVarient', ProductVarientSchema);

module.exports =ProductVarient;