class Coupon {
    constructor({ couponId, expireDate, maxUsers, discountType, discount, minPurchase, description, usedUsers, claimedUsers }) {
        this.couponId = couponId;
        this.expireDate = expireDate;
        this.maxUsers = maxUsers;
        this.discountType = discountType;
        this.discount = discount;
        this.minPurchase = minPurchase;
        this.description = description;
        this.usedUsers = usedUsers;
        this.claimedUsers = claimedUsers;
    }



    isValid(id) {
        console.log(id);
        if (new Date() > this.expirationDate || this.usedUsers === this.maxUsers || this.claimedUsers.includes(id)) {
            return false;
        }
        return true;
    }
}

module.exports = Coupon;
