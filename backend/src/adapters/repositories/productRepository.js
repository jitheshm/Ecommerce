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
    },
    getproduct: async (id) => {
        try {
            const product = await ProductModel.findOne({ _id: id })
            return product
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getAll:async()=>{
        try {
            const products=await ProductModel.find()
            return products
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    productListChange: async (id) => {
        try {
            const product = await ProductModel.findOne({ _id: id })
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