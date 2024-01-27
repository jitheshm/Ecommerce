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
                await ProductVarientModel.findOneAndUpdate(
                    { _id: id },
                    { $pull: { imagesUrl: { $in: oldImageUrl } } },
                    { new: true }
                );
            }

            return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteVarient:async(varientId)=>{
        try {
              const delDoc=await ProductVarientModel.findOneAndDelete({_id:varientId})
              return delDoc
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}