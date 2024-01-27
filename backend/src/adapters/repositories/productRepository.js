const ProductModel = require('../models/productModel')
module.exports = {
    addProduct: async (data) => {
        try {
            const product = new ProductModel(data)

            await product.save()

            console.log("new product added");
            return product._id
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
            const result = await ProductModel.updateOne({ _id: id }, filteredUpdateFields)
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
        const result = await ProductModel.deleteOne({ _id: productId })
        if (result.matchedCount === 0)
            return false
        else
            return true
    }
}