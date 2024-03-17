const ProductVarientModel = require('../models/productVarientModel')
module.exports = {
    addProductVarient: async (data) => {
        try {
            const productVarient = new ProductVarientModel(data)

            await productVarient.save()

            console.log("new product varient added");
            return productVarient._id
        } catch (error) {
            console.log("product varient insertion failed" + error);
            throw error
        }
    },
    updateProductVarient: async ({ id, imagesUrl, oldImageUrl, ...data }) => {
        try {

            const result = await ProductVarientModel.findOne({ _id: id, isDeleted: false })
            if (result) {
                const existingImages = result.imagesUrl
                const final=existingImages.map((item) => {
                    if (oldImageUrl.includes(item)) {
                        return imagesUrl.shift()
                    } else {
                        return item
                    }
                })
                if (imagesUrl.length > 0) {
                    data.imagesUrl = [...final, ...imagesUrl]
                } else {
                    data.imagesUrl = final
                }
                // if (oldImageUrl) {
                //     const newImages = existingImages.filter((item) => !oldImageUrl.includes(item))
                //     const finalImages = [...newImages, ...imagesUrl]
                //     data.imagesUrl = finalImages
                // } else if (imagesUrl) {
                //     data.imagesUrl = [...existingImages, ...imagesUrl]
                // }


                const res = await ProductVarientModel.updateOne({ _id: id, isDeleted: false }, data)
                if (res.matchedCount === 0)
                    return false
                else
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
    deleteVarient: async (varientId) => {
        try {
            const varient = await ProductVarientModel.findOne({ _id: varientId })
            if (varient) {
                varient.isDeleted = true
                await varient.save()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteAllVarient: async (productId) => {
        try {
            const deleVarients = await ProductVarientModel.find({ productId: productId })
            if (deleVarients) {
                deleVarients.forEach(async (element) => {
                    element.isDeleted = true
                    await element.save()
                });
                return true
            } else {
                return false
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getOneVarientPerProduct: async (filter) => {
        try {
            const pipeLine = [
                {
                    $match: {
                        isDeleted: false
                    }
                },

                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productDetails"

                    }
                },
                {
                    $match: {
                        "productDetails.isListed": true,
                        "productDetails.isDeleted": false,
                    }
                },

                {
                    $lookup: {
                        from: "offers",
                        let: {
                            localField1: { $arrayElemAt: ["$productDetails.categoryId", 0] },
                            localField2: "$productId"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $or: [
                                                    { $in: ["$$localField1", "$applicables"] },
                                                    { $in: ["$$localField2", "$applicables"] }
                                                ]
                                            },
                                            { $gt: ["$endDate", new Date()] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "offers"
                    }
                },

                {
                    $group: {
                        _id: "$productId",
                        productVarient: { $first: "$$ROOT" }
                    }
                },

                {
                    $replaceRoot: { newRoot: "$productVarient" }
                },
                {
                    $project: {
                        _id: 1,

                        productId: 1,
                        color: 1,
                        imagesUrl: 1,
                        stock: 1,
                        salePrice: 1,
                        actualPrice: 1,
                        isDeleted: 1,
                        productDetails: 1,
                        offers: 1,
                        offerPrice: {
                            $subtract: ["$salePrice", {
                                $max: {
                                    $map: {
                                        input: "$offers", // Iterate over the offers array
                                        as: "offer",
                                        in: {
                                            $cond: {
                                                if: { $eq: ["$$offer.discountType", "percentage"] }, // Check if offer type is "percentage"
                                                then: {
                                                    $multiply: [
                                                        "$$offer.discount", // Percentage value
                                                        { $divide: ["$salePrice", 100] } // Convert percentage to a decimal
                                                    ]
                                                },
                                                else: "$$offer.discount" // Use the discount amount as is
                                            }
                                        }
                                    }
                                }
                            }]
                        },
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "productDetails.categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $match: {
                        "category.isDeleted": false
                    }
                },
            ]

            if (filter) {
                pipeLine.push({
                    $match: {
                        "category.category": {
                            $regex: filter,
                            $options: 'i'
                        }
                    }
                })
            }

            const result = await ProductVarientModel.aggregate(pipeLine).exec()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getVarientDetails: async (color, id) => {
        const varientDetail = await ProductVarientModel.aggregate([
            {
                $match: {
                    productId: id,
                    color: color
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"

                }
            },
            {
                $lookup: {
                    from: "offers",
                    let: {
                        localField1: { $arrayElemAt: ["$productDetails.categoryId", 0] },
                        localField2: "$productId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $or: [
                                                { $in: ["$$localField1", "$applicables"] },
                                                { $in: ["$$localField2", "$applicables"] }
                                            ]
                                        },
                                        { $gt: ["$endDate", new Date()] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "offers"
                }
            },
            {
                $project: {
                    _id: 1,
                    productId: 1,
                    color: 1,
                    imagesUrl: 1,
                    stock: 1,
                    salePrice: 1,
                    actualPrice: 1,
                    isDeleted: 1,
                    productDetails: 1,
                    offers: 1,
                    offerPrice: {
                        $subtract: ["$salePrice", {
                            $max: {
                                $map: {
                                    input: "$offers", // Iterate over the offers array
                                    as: "offer",
                                    in: {
                                        $cond: {
                                            if: { $eq: ["$$offer.discountType", "percentage"] }, // Check if offer type is "percentage"
                                            then: {
                                                $multiply: [
                                                    "$$offer.discount", // Percentage value
                                                    { $divide: ["$salePrice", 100] } // Convert percentage to a decimal
                                                ]
                                            },
                                            else: "$$offer.discount" // Use the discount amount as is
                                        }
                                    }
                                }
                            }
                        }]
                    },
                }
            },

        ]).exec()
        return varientDetail
    },
    getVarient: async (id) => {
        try {
            const result = await ProductVarientModel.findOne({ _id: id })
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getColorList: async (id) => {
        try {
            console.log(id);
            const colorList = await ProductVarientModel.aggregate([
                {
                    $match: {
                        productId: id,
                        isDeleted: false
                    }
                },
                {
                    $group: {
                        _id: "$color"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        color: "$_id",

                    }
                }
            ]).exec()
            console.log(colorList);
            return colorList
        } catch (error) {
            console.log(error);
            throw error
        }
    },


    getProductAllVarient: async (id, page, limit) => {
        try {
            const result = await ProductVarientModel.find({ productId: id, isDeleted: false }).skip((page - 1) * limit).limit(limit)
            const totalVarients = await ProductVarientModel.countDocuments({ productId: id, isDeleted: false });
            const totalPages = Math.ceil(totalVarients / limit);
            console.log(result, totalVarients);
            return { varients: result, totalPages: totalPages }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    countStock: async (varientId) => {
        try {
            const product = await ProductVarientModel.findOne({ _id: varientId })
            return product.stock
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    stockUpdate: (items) => {
        try {
            Promise.all(items.map(async (item) => {
                const product = await ProductVarientModel.findOne({ _id: item.productId })
                product.stock = product.stock - item.quantity
                await product.save()
            }))
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    searchProducts: async (searchQuery, sort, filter) => {
        try {
            console.log(filter);
            const pipeLine = [
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productDetails"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "productDetails.categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $match: {
                        "category.isDeleted": false
                    }
                },
                {
                    $match: {
                        "productDetails.isListed": true,
                        "productDetails.isDeleted": false,
                        "isDeleted": false,


                        $or: [
                            { "productDetails.name": { $regex: searchQuery, $options: 'i' } },
                            { "productDetails.brand": { $regex: searchQuery, $options: 'i' } },
                            { "category.category": { $regex: searchQuery, $options: 'i' } },


                        ]
                    }
                },
                {
                    $lookup: {
                        from: "offers",
                        let: {
                            localField1: { $arrayElemAt: ["$productDetails.categoryId", 0] },
                            localField2: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $or: [
                                                    { $in: ["$$localField1", "$applicables"] },
                                                    { $in: ["$$localField2", "$applicables"] }
                                                ]
                                            },
                                            { $gt: ["$endDate", new Date()] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "offers"
                    }
                },

            ]
            if (filter.instock === 'true') {
                pipeLine.push({
                    $match: {
                        stock: { $gt: 0 }
                    }
                })
            }


            pipeLine.push({
                $project: {
                    _id: 1,
                    productId: 1,
                    color: 1,
                    imagesUrl: 1,
                    stock: 1,
                    salePrice: 1,
                    discount: {
                        $max: {
                            $map: {
                                input: "$offers", // Iterate over the offers array
                                as: "offer",
                                in: {
                                    $cond: {
                                        if: { $eq: ["$$offer.discountType", "percentage"] }, // Check if offer type is "percentage"
                                        then: {
                                            $multiply: [
                                                "$$offer.discount", // Percentage value
                                                { $divide: ["$salePrice", 100] } // Convert percentage to a decimal
                                            ]
                                        },
                                        else: "$$offer.discount" // Use the discount amount as is
                                    }
                                }
                            }
                        }
                    },
                    offerPrice: {
                        $ifNull: [{
                            $subtract: ["$salePrice", {
                                $max: {
                                    $map: {
                                        input: "$offers", // Iterate over the offers array
                                        as: "offer",
                                        in: {
                                            $cond: {
                                                if: { $eq: ["$$offer.discountType", "percentage"] }, // Check if offer type is "percentage"
                                                then: {
                                                    $multiply: [
                                                        "$$offer.discount", // Percentage value
                                                        { $divide: ["$salePrice", 100] } // Convert percentage to a decimal
                                                    ]
                                                },
                                                else: "$$offer.discount" // Use the discount amount as is
                                            }
                                        }
                                    }
                                }
                            }]
                        }, "$salePrice"]
                    },
                    productDetails: 1,
                    category: 1,
                    offers: 1
                }
            })

            if (parseInt(filter.minPrice)) {
                pipeLine.push({
                    $match: {
                        offerPrice: { $gte: parseInt(filter.minPrice) }
                    }
                })
            }


            ;
            if (parseInt(filter.maxPrice) <= 50000) {
                console.log("nnn");
                pipeLine.push({
                    $match: {
                        offerPrice: { $lte: parseInt(filter.maxPrice) }
                    }
                })
            }
            if (!sort.hasOwnProperty(null) && !sort.hasOwnProperty(undefined)) {
                console.log(sort);
                pipeLine.push({
                    $sort: sort
                })
            }
            return await ProductVarientModel.aggregate(pipeLine).exec()
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getNewProducts: async () => {
        try {
            const result = await ProductVarientModel.aggregate([
                {
                    $match: {
                        isDeleted: false
                    }
                },

                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productDetails"

                    }
                },
                {
                    $match: {
                        "productDetails.isListed": true,
                        "productDetails.isDeleted": false,
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "productDetails.categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $match: {
                        "category.isDeleted": false
                    }
                },
                {
                    $lookup: {
                        from: "offers",
                        let: {
                            localField1: { $arrayElemAt: ["$productDetails.categoryId", 0] },
                            localField2: "$productId"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $or: [
                                                    { $in: ["$$localField1", "$applicables"] },
                                                    { $in: ["$$localField2", "$applicables"] }
                                                ]
                                            },
                                            { $gt: ["$endDate", new Date()] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "offers"
                    }
                },

                {
                    $group: {
                        _id: "$productId",
                        productVarient: { $first: "$$ROOT" }
                    }
                },

                {
                    $replaceRoot: { newRoot: "$productVarient" }
                },
                {
                    $sort: {
                        "createdAt": -1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        _id: 1,

                        productId: 1,
                        color: 1,
                        imagesUrl: 1,
                        stock: 1,
                        salePrice: 1,
                        actualPrice: 1,
                        isDeleted: 1,
                        productDetails: 1,
                        offers: 1,
                        offerPrice: {
                            $subtract: ["$salePrice", {
                                $max: {
                                    $map: {
                                        input: "$offers", // Iterate over the offers array
                                        as: "offer",
                                        in: {
                                            $cond: {
                                                if: { $eq: ["$$offer.discountType", "percentage"] }, // Check if offer type is "percentage"
                                                then: {
                                                    $multiply: [
                                                        "$$offer.discount", // Percentage value
                                                        { $divide: ["$salePrice", 100] } // Convert percentage to a decimal
                                                    ]
                                                },
                                                else: "$$offer.discount" // Use the discount amount as is
                                            }
                                        }
                                    }
                                }
                            }]
                        },
                    }
                },
            ]).exec()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}