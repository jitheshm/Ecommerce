const Cart = require("../../entity/cartEntity")
const CartModel = require("../models/cartModel")

module.exports = {
    addToCart: async (data) => {

        try {

            const existCart = await CartModel.findOne({ userId: data.userId })

            if (!existCart) {

                const cart = new CartModel(data)
                await cart.save()
                return true
            }
            else {

                if (existCart.products.find(product => data.products.productId.equals(product.productId))) {
                    return false
                }

                const result = await CartModel.updateOne({ userId: data.userId }, {
                    $push: {
                        products: data.products
                    }
                })
                console.log(result);
                if (result.modifiedCount != 0)
                    return true
                else
                    return false
            }



        } catch (error) {
            console.log(error);
            throw error
        }

    },
    changeQuantity: async (existCart, quantity, stockCount) => {
        try {
            const res = await CartModel.updateOne({ userId: existCart.userId }, {
                $inc: { "products.$[elem].quantity": quantity }
            },
                { arrayFilters: [{ "elem.productId": existCart.products.productId }] })
            if (res.modifiedCount != 0) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    removeCartProduct: async (userId, productId) => {
        try {
            const res = await CartModel.updateOne({ userId: userId }, {
                $pull: { products: { productId: productId } }

            })
            console.log(res);
            if (res.modifiedCount != 0) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }

    },
    getCart: async (userId) => {
        try {
            const cart = await CartModel.aggregate([
                { $match: { userId: userId } },
                { $unwind: "$products" },
                {
                    $lookup: {
                        from: "productvarients",
                        localField: "products.productId",
                        foreignField: "_id",
                        as: "varient"
                    }
                },
                { $unwind: "$varient" },
                {
                    $lookup: {
                        from: "products",
                        localField: "varient.productId",
                        foreignField: "_id",
                        as: "productDetails"
                    }
                }, {
                    $unwind: "$productDetails"
                }
                , {
                    $lookup: {
                        from: "offers",
                        let: { localField1: "$productDetails.categoryId", localField2: "$varient._id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $or: [
                                                    { $eq: ["$applicables", "$$localField1"] },
                                                    { $eq: ["$applicables", "$$localField2"] }
                                                ]
                                            },
                                            { $gt: ["$endDate", new Date()] }
                                        ]
                                    },


                                }
                            }
                        ],
                        as: "offers"
                    }
                },
                {
                    $project: {
                        "products": 1,
                        "varient": 1,
                        "productDetails": 1,
                        "offers": 1,
                        //"price": { $multiply: ["$products.quantity", "$varient.salePrice"] },
                        "totalPrice": {
                            $subtract: [{ $multiply: ["$products.quantity", "$varient.salePrice"] }, {
                                $multiply: [
                                    {
                                        $sum: {
                                            $map: {
                                                input: "$offers", // Iterate over the offers array
                                                as: "offer",
                                                in: {
                                                    $cond: {
                                                        if: { $eq: ["$$offer.discountType", "percentage"] }, // Check if offer type is "percentage"
                                                        then: {
                                                            $multiply: [
                                                                "$$offer.discount", // Percentage value
                                                                { $divide: ["$varient.salePrice", 100] } // Convert percentage to a decimal
                                                            ]
                                                        },
                                                        else: "$$offer.discount" // Use the discount amount as is
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "$products.quantity"
                                ]
                            }]
                        }
                    }

                }

            ]).exec()
            console.log(cart);
            return cart
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    checkProductExist: async (productId, userId) => {
        try {
            console.log(productId, userId);
            const cart = await CartModel.aggregate([
                { $match: { userId: userId } },
                { $unwind: "$products" },
                { $match: { "products.productId": productId } }
            ])
            console.log(cart);
            if (cart) {
                return cart
            }
            else {
                return null
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    clearUserCart: async (userId) => {
        try {
            const res = await CartModel.deleteOne({ userId: userId })
            if (res.deletedCount != 0) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

}