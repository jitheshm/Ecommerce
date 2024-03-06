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
    getAllCoupon: async (page, limit) => {
        try {
            const coupons = await CouponModel.find().skip((page - 1) * limit).limit(limit);
            const totalCoupons = await CouponModel.countDocuments();
            const totalPages = Math.ceil(totalCoupons / limit);
            return { coupons, totalPages };
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
    },
    couponClaim: async (id, userId) => {
        try {
            const res = await CouponModel.updateOne(
                { couponId: id },
                {
                    $inc: {
                        usedUsers: 1,
                    },
                    $push: {
                        claimedUsers: userId,
                    },
                }
            );
            if (res.modifiedCount === 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            throw new Error(err);
        }
    },
    getActiveCoupons: async () => {
        try {
            return await CouponModel.find({ expireDate: { $gte: new Date() } });
        } catch (err) {
            throw new Error(err);
        }
    }




}