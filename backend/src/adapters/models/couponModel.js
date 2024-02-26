const mongoose = require('mongoose');
var Schema = mongoose.Schema
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
    usedUsers: {
        type: Number,
        required: true,
        default: 0

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

    },
    claimedUsers: {
        type: [Schema.ObjectId],
        required: true,
        default: []
    }


});

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;