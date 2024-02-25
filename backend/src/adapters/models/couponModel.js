const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    couponId: {
        type: String,
        required: true,

    },
    expireDate: {
        type: Date,
        required: true
    },
    maxUsers: {
        type: Number,
        required: true,
       
    },
    discountType: {
        type: String,
        required: true,

    },
    discount: {
        type: Number,
        required: true,
       
    },
    minPurchase: {
        type: Number,
        required: true,
        
    },
    description: {
        type: String,
        required: true,

    }


});

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;