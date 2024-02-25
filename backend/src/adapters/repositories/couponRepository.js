const CouponModel = require("../models/couponModel");

module.exports = {
    addCoupon: (data) => {
        try {
            const coupon = new CouponModel(data);
            coupon.save();
        } catch (err) {
            throw new Error(err);
        }
    }
}