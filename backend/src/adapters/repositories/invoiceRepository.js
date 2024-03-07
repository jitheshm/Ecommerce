const invoiceModel = require('../models/invoiceModel');
module.exports = {
    generateInvoice: async (data) => {
        const invoice = new invoiceModel(data)
        await invoice.save()
    },
    getInvoice: async (orderId) => {
        console.log(orderId);
        const invoice = await invoiceModel.aggregate([
            {
                $match: {
                    orderId: orderId
                }
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "orderId",
                    foreignField: "_id",
                    as: "order"
                }
            },
            {
                $unwind: "$order"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },

            {
                $unwind: "$user"
            },


            {
                $unwind: "$order.orderedItems"
            },
            {
                $lookup: {
                    from: "productvarients",
                    localField: "order.orderedItems.productId",
                    foreignField: "_id",
                    as: "varients"
                }
            },
            {
                $unwind: "$varients"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "varients.productId",
                    foreignField: "_id",
                    as: "product"

                }
            },
            {
                $unwind: "$product"

            }


        ]).exec()
        return invoice
    }
}