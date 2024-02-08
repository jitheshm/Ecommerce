class Cart {
    constructor(userId, productId) {
        this.userId = userId;
        this.products = [{
            productId: productId,
            quantity: 1

        }]
    }

}
module.exports = Cart