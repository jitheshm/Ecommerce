const Cart = require("../../entity/cartEntity")

module.exports = async (cartRepository, productVarientRepository, userId, productId) => {

    const cartObj = {
        productId: productId,
        quantity: 1
    }
    const data = new Cart(userId, cartObj)


    const count = await productVarientRepository.countStock(productId)
    console.log(count);
    const res = data.canChangeQuantity(count)
    if (res.status) {
        return await cartRepository.addToCart(data)

    } else {
        return false
    }

}