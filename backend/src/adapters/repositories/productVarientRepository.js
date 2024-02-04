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

            const filteredUpdateFields = {};
            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined) {
                    filteredUpdateFields[key] = value;
                }
            }

            if (filteredUpdateFields || imagesUrl) {
                const result = await ProductVarientModel.findOneAndUpdate({ _id: id }, {
                    $set: filteredUpdateFields, // Update other fields
                    ...(imagesUrl && { $push: { imagesUrl: { $each: imagesUrl } } }), // Pushing data to the arrayField
                }, { new: true })
                console.log(result);
            }

            if (oldImageUrl) {
                console.log("oldImageUrl", oldImageUrl);
                const res=await ProductVarientModel.updateOne(
                    { _id: id },
                    { $pull: { imagesUrl: { $in: oldImageUrl } } }
                    
                );
                console.log(res);
            }

            return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteVarient: async (varientId) => {
        try {
            const delDoc = await ProductVarientModel.findOneAndDelete({ _id: varientId })
            return delDoc
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteAllVarient: async (productId) => {
        try {
            const deleVarients = await ProductVarientModel.find({ productId: productId }, { imagesUrl: 1, _id: 0 })
            const result = await ProductVarientModel.deleteMany({ productId: productId })
            console.log(deleVarients);
            console.log(result);
            if (result.matchedCount === 0)
                return null
            else
                return deleVarients

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getOneVarientPerProduct: async () => {
        try {
            const result = await ProductVarientModel.aggregate([
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
                        "productDetails.isListed": true
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
                }
            ]).exec()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getVarientDetails: async (id) => {
        const varientDetail = await ProductVarientModel.aggregate([
            {
                $match: {
                    _id: id
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
        ]).exec()
        return varientDetail
    },
    getVarient:async(id)=>{
        try {
            const result=await ProductVarientModel.findOne({_id:id})
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}