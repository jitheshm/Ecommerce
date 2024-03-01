const Cart = require("../../entity/cartEntity")

module.exports = async (cartRepository, varientRepository, userId, productId, quantity) => {

    const count = await varientRepository.countStock(productId)
    const existCart = await cartRepository.checkProductExist(productId, userId)
    if (existCart.length < 1)
        return { status: false, msg: "Product not found in cart" }
    const cart = new Cart(existCart[0].userId, existCart[0].products)
    const { status, msg } = cart.canChangeQuantity(count, quantity)
    console.log(msg);
    if (status) {
        await cartRepository.changeQuantity(cart, quantity, count)
        return { status: true, msg: "Quantity updated successfully" }
    }
    else
        return { status, msg }
}