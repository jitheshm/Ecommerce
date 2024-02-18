class Order {
    constructor({ userId, orderAmount, deliveryAddress, orderDate, deliveryDate, orderedItems, coupon, offer, transactionId }) {
        this.userId = userId
        this.orderAmount = orderAmount;
        this.deliveryAddress = deliveryAddress;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.orderedItems = orderedItems;
        this.coupon = coupon;
        this.offer = offer;
        this.transactionId = transactionId;
    }
}
module.exports = Order