class Cart {
    constructor(userId, products) {
        this.userId = userId;
        this.products = products
    }



    canChangeQuantity(stockCount, quantityUpdate) {
        if (stockCount <= 0) {
            return { status: false, msg: "Quantity can't be less than 1" }
        }

        if (!quantityUpdate) {
            return { status: true, msg: "Quantity can be updated" };
        }

        const newQuantity = this.products.quantity + quantityUpdate;
        console.log(newQuantity, stockCount);
        if (!newQuantity > 0 || newQuantity > 5)
            return { status: false, msg: "Quantity can't be less than 1 or greater than 5" }
        if (newQuantity > stockCount)
            return { status: false, msg: "out of stock" }
        return { status: true, msg: "Quantity can be updated" };

    }



}
module.exports = Cart