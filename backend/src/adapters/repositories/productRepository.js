const ProductModel =require('../models/productModel')
module.exports={
    addProduct:async(data)=>{
        try {
            const product = new ProductModel(data)
            
            await product.save()

            console.log("new product added");
            return product._id
        } catch (error) {
            console.log("product insertion failed" + error);
            throw error
        }
    }
}