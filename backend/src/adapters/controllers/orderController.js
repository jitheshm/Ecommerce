const changeStatus = require("../../usecase/order/changeStatus")
const getOrders = require("../../usecase/order/getOrders")
const getSpecificOrder = require("../../usecase/order/getSpecificOrder")
const orderList = require("../../usecase/order/orderList")
const placeOrder = require("../../usecase/order/placeOrder")
const addressRepository = require("../repositories/addressRepository")
const cartRepository = require("../repositories/cartRepository")
const orderRepository = require("../repositories/orderRepository")
const productVarientRepository = require("../repositories/productVarientRepository")

module.exports = {
    placeOrder: async (userId, data) => {
        data.userId = userId
        return await placeOrder(orderRepository, addressRepository, cartRepository,productVarientRepository, data)
    },
    getOrders: async (userId) => {
        return await getOrders(orderRepository, userId)
    },
    getSpecificOrder: async (orderId) => {
        return await getSpecificOrder(orderRepository, orderId)
    },
    changeStatus: async (orderId, userId, orderStatus) => {
        return await changeStatus(orderRepository, orderId, userId, orderStatus)
    },
    ordersList: async () => {
        return await orderList(orderRepository)
    }
}