class Order {
    constructor({ userId, paymentMethod, orderAmount, deliveryAddress, orderStatus='pending', deliveryDate, shippingDate, orderedItems, coupon, offer, transactionId='COD' }) {
        this.userId = userId;
        this.orderAmount = orderAmount;
        this.deliveryAddress = deliveryAddress;
        this.orderDate = new Date();
        this.paymentMethod = paymentMethod;
        this.orderStatus = orderStatus;
        this.deliveryDate = deliveryDate;
        this.shippingDate = shippingDate;
        this.orderedItems = orderedItems;
        this.coupon = coupon;
        this.offer = offer;
        this.transactionId = transactionId;

    }
}
module.exports = Order