const CouponModel = require("../models/couponModel");

module.exports = {
    addCoupon: (data) => {
        try {
            const coupon = new CouponModel(data);
            coupon.save();
        } catch (err) {
            throw new Error(err);
        }
    },
    getCoupon: (id) => {
        try {
            return CouponModel.findOne({ couponId: id });
        } catch (err) {
            throw new Error(err);
        }
    },
    updateCoupon: async (data) => {
        try {
            const res = await CouponModel.updateOne({ couponId: data.couponId }, { $set: { ...data } });
            if (res.modifiedCount === 0) {
                return false
            } else
                return true

        } catch (error) {
            throw new Error(error);
        }
    },
    getAllCoupon: async () => {
        try {
            return await CouponModel.find();
        } catch (err) {
            throw new Error(err);
        }
    },
    deleteCoupon: async (id) => {
        try {
            const status = await CouponModel.deleteOne({ couponId: id })
            if (status.deletedCount === 0) {
                return false
            }
            return true
        } catch (error) {
            throw new Error(error);
        }
    }
}