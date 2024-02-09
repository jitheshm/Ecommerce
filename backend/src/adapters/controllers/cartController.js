const addToCart = require("../../usecase/cart/addToCart")
const changeQuantity = require("../../usecase/cart/changeQuantity")
const checkProductExist = require("../../usecase/cart/checkProductExist")
const deleteCartProduct = require("../../usecase/cart/deleteCartProduct")
const findCart = require("../../usecase/cart/findCart")
const isStockAvailable = require("../../usecase/cart/isStockAvailable")
const cartRepository = require("../repositories/cartRepository")
const productVarientRepository = require("../repositories/productVarientRepository")

module.exports = {
    addToCart: async (userId, data) => {
        return await addToCart(cartRepository, productVarientRepository, userId, data)


    },
    changeQuantity: async (userId, productId, quantity) => {
        return await changeQuantity(cartRepository, productVarientRepository, userId, productId, quantity)
    },
    removeCartProduct: async (userId, productId) => {
        return await deleteCartProduct(cartRepository, userId, productId)
    },
    findCart: async (userId) => {
        return await findCart(cartRepository, userId)
    },
    checkProductExist: async (productId, userId) => {
        return await checkProductExist(cartRepository, productId, userId)
    },
    stockAvailable: async (productId, quantity) => {
        return await isStockAvailable(productVarientRepository, productId, quantity)
    }
}