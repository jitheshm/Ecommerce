class Cart {
    constructor(userId, products) {
        this.userId = userId;
        this.products = products
    }



    canChangeQuantity(stockCount, quantityUpdate) {
        if (stockCount <= 0) {
            return false;
        }

        if (!quantityUpdate) {
            return true;
        }

        const newQuantity = this.products.quantity + quantityUpdate;
        console.log(newQuantity, stockCount);
        if (newQuantity > 0 && newQuantity <= stockCount && newQuantity <= 5) {
            return true;
        }

        return false;
    }



}
module.exports = Cart