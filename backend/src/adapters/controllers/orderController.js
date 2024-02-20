const changeStatus = require("../../usecase/order/changeStatus")
const getOrders = require("../../usecase/order/getOrders")
const getSpecificOrder = require("../../usecase/order/getSpecificOrder")
const orderList = require("../../usecase/order/orderList")
const placeCodOrder = require("../../usecase/order/placeCodOrder")
const addressRepository = require("../repositories/addressRepository")
const cartRepository = require("../repositories/cartRepository")
const orderRepository = require("../repositories/orderRepository")
const productVarientRepository = require("../repositories/productVarientRepository")
const razorpayGateway = require("../gateways/razorpayGateway")
const placeOnlineOrder = require("../../usecase/order/placeOnlineOrder")
const verifyPayment = require("../../usecase/order/verifyPayment")
const returnProduct = require("../../usecase/order/returnProduct")
const returnOrdersList = require("../../usecase/order/returnOrdersList")
const changeReturnStatus = require("../../usecase/order/changeReturnStatus")
const walletRepository = require("../repositories/walletRepository")
const refund = require("../../usecase/order/refund")
module.exports = {
    placeOrder: async (userId, data, razorpaykey_id, razorpaykey_secret) => {
        data.userId = userId
        if (data.paymentMethod === "COD")
            return await placeCodOrder(orderRepository, addressRepository, cartRepository, productVarientRepository, data)
        else
            return await placeOnlineOrder(orderRepository, addressRepository, razorpayGateway, data, razorpaykey_id, razorpaykey_secret)
    },

    getOrders: async (userId) => {
        return await getOrders(orderRepository, userId)
    },
    getSpecificOrder: async (orderId, productId) => {
        return await getSpecificOrder(orderRepository, orderId, productId)
    },
    changeStatus: async (orderId, userId, productId, orderStatus) => {
        return await changeStatus(orderRepository, orderId, userId, productId, orderStatus)
    },
    ordersList: async () => {
        return await orderList(orderRepository)
    },
    verifyPayment: async (data, secret) => {
        console.log("verify payment");
        console.log(data);
        return verifyPayment(data, secret, razorpayGateway, orderRepository, productVarientRepository, cartRepository)


    },
    returnProduct: async (orderId, userId, productId, reason) => {

        return await returnProduct(orderRepository, orderId, userId, productId, reason)
    },
    returnOrdersList: async () => {
        return await returnOrdersList(orderRepository)
    },
    changeReturnStatus: async (orderId, productId, status) => {
        await changeReturnStatus(orderRepository, orderId, productId, status)
        if (status === 'Refund')
            return await refund(orderId, productId, status, orderRepository, walletRepository,)
        else
            return true
    }
    
}