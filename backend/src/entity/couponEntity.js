class Coupon {
    constructor({ couponId, expireDate, maxUsers, discountType, discount, minPurchase, description }) {
        this.couponId = couponId;
        this.expireDate = expireDate;
        this.maxUsers = maxUsers;
        this.discountType = discountType;
        this.discount = discount;
        this.minPurchase = minPurchase;
        this.description = description;
    }



    isExpired() {
        return new Date() > this.expirationDate;
    }
}

module.exports = Coupon;
