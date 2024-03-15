const ProductModel = require('../models/productModel')
module.exports = {
    addProduct: async (data) => {
        try {
            const exist = await ProductModel.findOne({ productName: { $regex: new RegExp(data.productName, 'i') } })
            if (exist) {
                return false
            }
            const product = new ProductModel(data)

            await product.save()

            console.log("new product added");
            return true
        } catch (error) {
            console.log("product insertion failed" + error);
            throw error
        }
    },
    updateProduct: async (data, id) => {
        try {
            const filteredUpdateFields = {};
            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined) {
                    filteredUpdateFields[key] = value;
                }
            }
            const exist = await ProductModel.findOne({ productName: filteredUpdateFields.productName, _id: { $ne: id } })
            if (exist)
                return false
            const result = await ProductModel.updateOne({ _id: id, isDeleted: false }, filteredUpdateFields)
            if (result.matchedCount === 0)
                return false
            else
                return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteProduct: async (productId) => {
        try {
            const product = await ProductModel.findOne({ _id: productId })
            if (product) {
                product.isDeleted = true
                await product.save()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getproduct: async (id) => {
        try {
            const product = await ProductModel.aggregate([
                {
                    $match: {
                        _id: id,
                        isDeleted: false
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryName"
                    }
                }

            ])
            return product[0]
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getAll: async (page, limit) => {
        try {
            // const products = await ProductModel.find({ isDeleted: false }).skip((page - 1) * limit).limit(limit)
            const result = await ProductModel.aggregate([
                {
                    $match: {
                        isDeleted: false
                    },


                }, {
                    $facet: {
                        totalCount: [
                            {
                                $count: "total"
                            }
                        ],
                        products: [

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
            const products = result[0].products
            const totalCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
            const totalPages = Math.ceil(totalCount / limit);
            return { products, totalPages }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    productListChange: async (id) => {
        try {
            const product = await ProductModel.findOne({ _id: id, isDeleted: false })
            if (product) {
                product.isListed = !product.isListed
                await product.save()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }


}