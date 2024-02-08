const addToCart = require("../../usecase/cart/addToCart")
const changeQuantity = require("../../usecase/cart/changeQuantity")
const deleteCartProduct = require("../../usecase/cart/deleteCartProduct")
const cartRepository = require("../repositories/cartRepository")
const productVarientRepository = require("../repositories/productVarientRepository")

module.exports = {
    addToCart: async (userId, data) => {
        return await addToCart(cartRepository,productVarientRepository, userId, data)


    },
    changeQuantity: async (userId,productId,quantity) => {
        return await changeQuantity(cartRepository, productVarientRepository, userId, productId, quantity)
    },
    removeCartProduct: async (userId,productId) => {
        return await deleteCartProduct(cartRepository,userId,productId)
    }
}