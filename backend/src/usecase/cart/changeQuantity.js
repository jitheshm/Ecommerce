const Cart = require("../../entity/cartEntity")

module.exports = async (cartRepository, varientRepository, userId, productId, quantity) => {

    const count = await varientRepository.countStock(productId)
    const existCart = await cartRepository.checkProductExist(productId, userId)
    if (existCart.length < 1)
        return false
    const cart = new Cart(existCart[0].userId, existCart[0].products)
    const status = cart.canChangeQuantity(count, quantity)
    console.log(status);
    if (status)
        return await cartRepository.changeQuantity(cart, quantity, count)
    else
        return false
}