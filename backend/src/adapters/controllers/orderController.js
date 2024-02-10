const getOrders = require("../../usecase/order/getOrders")
const getSpecificOrder = require("../../usecase/order/getSpecificOrder")
const placeOrder = require("../../usecase/order/placeOrder")
const addressRepository = require("../repositories/addressRepository")
const cartRepository = require("../repositories/cartRepository")
const orderRepository = require("../repositories/orderRepository")

module.exports = {
    placeOrder: async (userId, data) => {
        data.userId = userId
        return await placeOrder(orderRepository, addressRepository, cartRepository, data)
    },
    getOrders: async (userId) => {
        return await getOrders(orderRepository, userId)
    },
    getSpecificOrder: async (orderId) => {
        return await getSpecificOrder(orderRepository, orderId)
    }
}