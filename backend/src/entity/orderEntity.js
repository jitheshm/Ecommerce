class Order {
    constructor({ userId, orderDate, paymentMethod, orderAmount, deliveryAddress, orderStatus = 'Confirmed', deliveryDate, shippingDate, orderedItems, coupon, offer, transactionId = 'COD' }) {
        this.userId = userId;
        this.orderAmount = orderAmount;
        this.deliveryAddress = deliveryAddress;
        this.orderDate = orderDate
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