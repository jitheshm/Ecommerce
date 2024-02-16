const OrderModel = require("../models/orderModel")

module.exports = {
    placeOrder: async (data) => {
        try {
            const order = new OrderModel(data)
            await order.save()
            return {
                _id: order._id,
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
                        userId: userId,
                        orderStatus: { $ne: 'pending' }
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

    getSpecificOrder: async (orderId, productId) => {
        try {
            console.log(orderId);
            // console.log("hai");
            const order = await OrderModel.aggregate([
                {
                    $match: {
                        _id: orderId
                    }
                },
                {
                    $unwind: '$orderedItems'
                }
                ,
                {
                    $match: {
                        "orderedItems.productId": productId
                    }
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

            ]).exec()
            console.log(order);
            return order
        } catch (error) {
            throw error
        }
    },
    changeOrderStatus: async (orderId, userId, status) => {
        try {
            const order = await OrderModel.findOne({ _id: orderId, userId: userId })
            order.orderStatus = status
            await order.save()
            if (order) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    },
    getOrdersList: async () => {
        try {
            const orders = await OrderModel.find({})
            console.log(orders);
            return orders
        } catch (error) {
            throw error
        }
    },
    updateOrder: async (orderId, paymentId, status) => {
        try {
            const order = await OrderModel.findOneAndUpdate({ _id: orderId }, { orderStatus: status, transactionId: paymentId }, { new: true })

            return order
        } catch (error) {
            throw error
        }
    },
    returnProduct: async (orderId, userId, productId) => {

        try {
            const order = await OrderModel.findOneAndUpdate(
                { _id: orderId, userId: userId, "orderedItems.productId": productId },
                { $set: { "orderedItems.$[elem].returnStatus": "pending" } },
                { new: true, arrayFilters: [{ "elem.productId": productId }] }
            );
            if (order) {
                return true
            }
            else
                return false
        } catch (error) {
            throw error
        }

    }
}