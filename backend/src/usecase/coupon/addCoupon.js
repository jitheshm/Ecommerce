const Coupon = require("../../entity/couponEntity");

module.exports = async (data, couponRepository) => {
    const coupon = new Coupon(data);
    const existCoupon = await couponRepository.getCoupon(coupon.couponId);
    if (existCoupon) {
        throw new Error("Coupon already exists");
    }
    return await couponRepository.addCoupon(coupon);
}