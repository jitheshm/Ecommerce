const OrderModel = require("../models/orderModel")

module.exports = {
    placeOrder: async (data) => {
        try {
            const order = new OrderModel(data)
            await order.save()
            return {
                _id: order._id,
                amountPaid: order.amountPaid,
                orderDate: order.orderDate,
                transactionId: order.transactionId
            }
        } catch (error) {

            throw error
        }
    },
    getOrders: async (userId, page, limit) => {
        try {
            const result = await OrderModel.aggregate([
                {
                    $match: {
                        userId: userId,

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
                },

                {
                    $facet: {
                        totalCount: [
                            {
                                $count: "total"
                            }
                        ],
                        orders: [
                            {
                                $sort: {
                                    orderDate: -1
                                }
                            },
                            {
                                $skip: (page - 1) * limit
                            },
                            {
                                $limit: limit
                            }
                        ]
                    }
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
            const orders = result[0].orders
            const totalCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
            const totalPages = Math.ceil(totalCount / limit);
            return { orders, totalPages }
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
    getOrdersList: async (page = 1, limit = 1000) => {
        try {
            const orders = await OrderModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: '$orderedItems'
                },
                {
                    $lookup: {
                        from: 'productvarients',
                        localField: 'orderedItems.productId',
                        foreignField: '_id',
                        as: 'variants'
                    }
                }, {
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
                    $lookup: {
                        from: 'products',
                        localField: 'variants.productId',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $unwind: '$productDetails'
                },
                {
                    $sort: {
                        orderDate: -1
                    }
                },
                {
                    $skip: (page - 1) * limit
                },
                {
                    $limit: limit
                },

            ])
            const totalCount = await OrderModel.countDocuments();
            const totalPages = Math.ceil(totalCount / limit);

            console.log(orders);
            return { orders, totalPages }
        } catch (error) {
            throw error
        }
    },
    updateOrder: async (orderId, paymentId, status, paymentStatus) => {
        try {
            const order = await OrderModel.findOneAndUpdate(
                { _id: orderId },
                {
                    $set: {
                        "orderedItems.$[].deliveryStatus": status,
                        transactionId: paymentId,
                        paymentStatus: paymentStatus
                    }
                },
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
    getReturnOrdersList: async (page, limit) => {
        try {
            const result = await OrderModel.aggregate([
                {
                    $unwind: '$orderedItems'
                },
                {
                    $match: {
                        "orderedItems.returnStatus": { $in: ["pending", "Confirmed", "Returned"] }
                    }
                },
                {
                    $facet: {
                        totalCount: [
                            {
                                $count: "total"
                            }
                        ],
                        orders: [
                            {
                                $sort: {
                                    orderDate: -1
                                }
                            },
                            {
                                $skip: (page - 1) * limit
                            },
                            {
                                $limit: limit
                            }
                        ]
                    }
                }
            ])

            const orders = result[0].orders
            const totalCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
            const totalPages = Math.ceil(totalCount / limit);

            return { orders, totalPages }
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
                            $lte: new Date(endDate),

                        }
                    }
                }, {
                    $unwind: '$orderedItems'
                },
                {
                    $match: {
                        "orderedItems.deliveryStatus": { $nin: ['Cancelled', 'pending'] }
                    }
                },
                {
                    $group: {
                        _id: {
                            _id: "$_id",
                            orderDate: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }
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
                        _id: "$_id.orderDate",
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
    },
    getOrder: async (orderId) => {
        const order = await OrderModel.aggregate([
            {
                $match: {
                    _id: orderId
                }
            }
            ,
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

        ]).exec()
        return order
    },
    salesOverview: (startDate, endDate, dateFormat) => {
        try {
            console.log(startDate, endDate, dateFormat);
            return OrderModel.aggregate([
                {
                    $match: {
                        orderDate: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        }
                    }
                },
                {
                    $unwind: '$orderedItems'
                },
                {
                    $match: {
                        "orderedItems.deliveryStatus": { $nin: ['Cancelled', 'pending'] }
                    }
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
                        _id: { $dateToString: { format: dateFormat, date: "$_id.orderDate" } },
                        orderCount: { $sum: 1 },
                        productsCount: { $sum: '$ProductsCount' },
                        revenue: { $sum: '$revenue' },
                        discount: { $sum: '$discount' },
                        couponDiscount: { $sum: '$couponDiscount' }
                    }
                }, {
                    $sort: {
                        _id: 1
                    }
                }
            ]).exec()

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    topSellingProducts: async () => {
        try {
            const topProducts = await OrderModel.aggregate([
                {
                    $unwind: '$orderedItems'
                },
                {
                    $group: {
                        _id: "$orderedItems.productId",
                        totalQuantity: { $sum: "$orderedItems.quantity" }
                    }
                },
                {
                    $sort: {
                        totalQuantity: -1
                    }
                },
                {
                    $lookup: {
                        from: 'productvarients',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'varientDetails'
                    }
                },
                {
                    $unwind: '$varientDetails'
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'varientDetails.productId',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $unwind: '$productDetails'
                },
                {
                    $group: {
                        _id: {
                            productId: '$_id',
                            productName: '$productDetails.productName'
                        },
                        totalQuantity: { $sum: "$totalQuantity" }
                    }
                },
                {
                    $sort: {
                        totalQuantity: -1
                    }
                },
                {
                    $limit: 10
                },

                {
                    $project: {
                        _id: 0,
                        productId: '$_id.productId',
                        productName: '$_id.productName',
                        totalQuantity: 1
                    }
                }
            ]).exec()
            console.log(topProducts);
            return topProducts
        } catch (error) {
            throw error
        }
    }

}