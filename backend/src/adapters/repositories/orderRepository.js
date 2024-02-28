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
    changeOrderStatus: async (orderId, userId, productId, status) => {
        try {
            const order = await OrderModel.findOneAndUpdate(
                { _id: orderId, userId: userId },
                { $set: { "orderedItems.$[elem].deliveryStatus": status } },
                { arrayFilters: [{ "elem.productId": productId }], new: true }
            );
            console.log("jj");
            console.log(order);
            return order
            // if (order) {
            //     return true;
            // } else {
            //     return false;
            // }
        } catch (error) {
            throw error;
        }
    },
    getOrdersList: async () => {
        try {
            const orders = await OrderModel.aggregate([
                {
                    $unwind: '$orderedItems'
                }
            ])
            console.log(orders);
            return orders
        } catch (error) {
            throw error
        }
    },
    updateOrder: async (orderId, paymentId, status) => {
        try {
            const order = await OrderModel.findOneAndUpdate(
                { _id: orderId },
                { $set: { "orderedItems.$[].deliveryStatus": status }, transactionId: paymentId },
                { new: true }
            );

            return order;
        } catch (error) {
            throw error;
        }
    },
    returnProduct: async (orderId, userId, productId, reason) => {

        try {
            const order = await OrderModel.findOneAndUpdate(
                { _id: orderId, userId: userId, "orderedItems.productId": productId },
                { $set: { "orderedItems.$[elem].returnStatus": "pending", "orderedItems.$[elem].returnReason": reason } },
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

    },
    getReturnOrdersList: async () => {
        try {
            const orders = await OrderModel.aggregate([
                {
                    $unwind: '$orderedItems'
                },
                {
                    $match: {
                        "orderedItems.returnStatus": { $in: ["pending", "Confirmed", "Returned"] }
                    }
                }
            ])
            console.log(orders);
            return orders
        } catch (error) {
            throw error
        }
    },
    changeReturnStatus: async (orderId, productId, status) => {
        try {
            const order = await OrderModel.updateOne(
                { _id: orderId },
                { $set: { "orderedItems.$[elem].returnStatus": status } },
                { arrayFilters: [{ "elem.productId": productId }] }
            );
            console.log(order);
            if (order.modifiedCount > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    },
    getOrderSpecificProduct: async (orderId, productId) => {
        try {
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


            ]).exec()
            return order
        } catch (error) {
            throw error;
        }
    },
    generateSalesReport: async (startDate, endDate) => {
        try {
            console.log(new Date(startDate), new Date(endDate));
            const report = await OrderModel.aggregate([
                {
                    $match: {
                        orderDate: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        }
                    }
                }, {
                    $unwind: '$orderedItems'
                },
                {
                    $group: {
                        _id: {
                            _id: "$_id",
                            orderDate: "$orderDate"
                        },
                        ProductsCount: { $sum: 1 },
                        revenue: {
                            $sum: {
                                $cond: [{ $ne: ["$orderedItems.deliveryStatus", "Cancelled"] }, "$orderedItems.totalprice", 0]
                            }
                        },
                        discount: {
                            $sum: {
                                $cond: [{ $ne: ["$orderedItems.deliveryStatus", "Cancelled"] }, "$orderedItems.discount", 0]
                            }

                        },
                        couponDiscount: {
                            $max: {
                                $cond: [{ $ne: ["$orderedItems.deliveryStatus", "Cancelled"] }, "$discount", 0]
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id.orderDate',
                        ProductsCount: { $sum: '$ProductsCount' },
                        revenue: { $sum: '$revenue' },
                        discount: { $sum: '$discount' },
                        couponDiscount: { $sum: '$couponDiscount' }
                    }
                }


            ]).exec()
            return report
        } catch (error) {
            throw error;
        }
    }
}