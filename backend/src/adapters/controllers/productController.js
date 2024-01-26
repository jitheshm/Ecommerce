const addProduct = require("../../usecase/product/addProduct")
const addProductVarient = require("../../usecase/productVarient/addVarient")
const productRepository = require("../repositories/productRepository")
const productVarientRepository = require("../repositories/productVarientRepository")

module.exports={
    productAdd:async(prodData)=>{
       const proId=await addProduct(prodData,productRepository)
       return proId
    },
    varientAdd:async(varientData)=>{
        const productVId=await addProductVarient(varientData,productVarientRepository)
        return productVId
    }
}