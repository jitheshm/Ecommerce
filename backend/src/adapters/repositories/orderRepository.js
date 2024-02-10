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
    },
    getOrders: async (userId) => {
        try {
            // const orders = await OrderModel.find({ userId: userId })
            const orders = await OrderModel.aggregate([
                {
                    $match: {
                        userId: userId
                    }
                },
                {
                    $unwind: '$orderedItems'
                }
                ,
                {
                    $lookup: {
                        from: 'productvarients',
                        localField: 'orderedItems.productId',
                        foreignField: '_id',
                        as: 'variants'
                    }
                },
                {
                    $unwind: '$variants'
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'variants.productId',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $unwind: '$productDetails'
                }
               
                // {
                //     $lookup: {
                //         from: 'products',
                //         localField: 'variants.productId',
                //         foreignField: '_id',
                //         as: 'productDetails'
                //     }
                // },

            ]).exec()
            return orders
        } catch (error) {
            throw error
        }
    },
}