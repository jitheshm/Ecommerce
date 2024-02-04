const addProduct = require("../../usecase/product/addProduct")
const deleteproduct = require("../../usecase/product/deleteProduct")
const updateproduct = require("../../usecase/product/updateProduct")
const addProductVarient = require("../../usecase/product/addVarient")
const deleteAllVarient = require("../../usecase/product/deleteAllVarient")
const deletevarient = require("../../usecase/product/deleteVarient")
const updatevarient = require("../../usecase/product/updateVarient")
const productRepository = require("../repositories/productRepository")
const productVarientRepository = require("../repositories/productVarientRepository")
const getOneVarientPerProduct = require("../../usecase/product/getOneVarientPerProduct")
const getproductdetails = require("../../usecase/product/getVarientDetail")
const getVarientDetails = require("../../usecase/product/getVarientDetail")
const editProduct = require("../../usecase/product/editProduct")
const getAllProducts = require("../../usecase/product/getAllProducts")
const getVarient = require("../../usecase/product/getVarient")

module.exports = {
    productAdd: async (prodData) => {
        const proId = await addProduct(prodData, productRepository)
        return proId
    },
    varientAdd: async (varientData) => {
        const productVId = await addProductVarient(varientData, productVarientRepository)
        return productVId
    },
    varientUpdate: async (varientData) => {
        await updatevarient(varientData, productVarientRepository)
    },
    varientDelete: async (varientId) => {
        const delDoc = await deletevarient(varientId, productVarientRepository)
        return delDoc
    },
    productUpdate: async (data) => {
        const status = await updateproduct(data, productRepository)
        return status
    },
    productDelete: async (proId) => {
        const status = await deleteproduct(proId, productRepository)
        if (status) {
            const deleVarient = await deleteAllVarient(proId, productVarientRepository)
            return deleVarient
        } else
            return null



    },
    getOneVarientPerProduct: async () => {
        const products = await getOneVarientPerProduct(productVarientRepository)
        return products
    },
    getVarientDetail: async (id) => {
       const varientDetail=await getVarientDetails(id,productVarientRepository)
       return varientDetail
    },
    editProduct:async(id)=>{
        const result =await editProduct(id,productRepository)
        return result
    },
    getAllProducts:async()=>{
        const result=await getAllProducts(productRepository)
        return result
    },
    getVarient:async(id)=>{
        const result=await getVarient(id,productVarientRepository)   
        return result
     }
}