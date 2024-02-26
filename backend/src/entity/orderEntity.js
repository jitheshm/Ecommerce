class Order {
    constructor({ userId, orderAmount, deliveryAddress, orderDate, deliveryDate, orderedItems, coupon, offer, transactionId, discount, amountPaid}) {
        this.userId = userId
        this.orderAmount = orderAmount;
        this.discount = discount;
        this.amountPaid = amountPaid;
        this.deliveryAddress = deliveryAddress;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.orderedItems = orderedItems;
        this.coupon = coupon;
        this.offer = offer;
        this.transactionId = transactionId;
    }

    isReturnAvailable() {
        const parts = this.deliveryDate.split('-'); // Split the date string into parts
        const day = parseInt(parts[0], 10); // Parse day component as integer
        const month = parseInt(parts[1], 10) - 1; // Parse month component as integer (subtract 1 because months are zero-based)
        const year = parseInt(parts[2], 10); // Parse year component as integer
        const returnDate = new Date(year, month, day); // Convert deliveryDate string to a Date object
        const currentDate = new Date();
        returnDate.setDate(returnDate.getDate() + 7);

        if (this.orderedItems.deliveryStatus === 'Delivered' && currentDate < returnDate) {

            return true;
        } else {
            const error = new Error("Return is not available")
            error.status = 400
            throw error
        }

    }
}
module.exports = Order