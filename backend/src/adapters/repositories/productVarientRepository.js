const ProductVarientModel =require('../models/productVarientModel')
module.exports={
    addProductVarient:async(data)=>{
        try {
            const productVarient = new ProductVarientModel(data)
            
            await productVarient.save()

            console.log("new product varient added");
            return productVarient._id
        } catch (error) {
            console.log("product varient insertion failed" + error);
            throw error
        }
    }
}