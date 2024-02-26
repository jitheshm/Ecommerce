class Coupon {
    constructor({ couponId, expireDate, maxUsers, discountType, discount, minPurchase, description, usedUsers}) {
        this.couponId = couponId;
        this.expireDate = expireDate;
        this.maxUsers = maxUsers;
        this.discountType = discountType;
        this.discount = discount;
        this.minPurchase = minPurchase;
        this.description = description;
        this.usedUsers = usedUsers;
    }



    isExpired() {
        return new Date() > this.expirationDate;
    }
}

module.exports = Coupon;
