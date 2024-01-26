const addProduct = require("../../usecase/product/addProduct")
const productRepository = require("../repositories/productRepository")

module.exports={
    productAdd:async(prodData)=>{
       const proId=await addProduct(prodData,productRepository)
       return proId
    }
}