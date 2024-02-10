const OrderModel = require("../models/orderModel")

module.exports = {
    placeOrder: async (data) => {
        try {
            const order = new OrderModel(data)
            await order.save()
            return {
                orderId: order._id,
                orderAmount: order.orderAmount,
                orderDate: order.orderDate,
                transactionId: order.transactionId
            }
        } catch (error) {

            throw error
        }
    }
}