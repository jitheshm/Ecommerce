const addProduct = require("../../usecase/product/addProduct")
const deleteproduct = require("../../usecase/product/deleteProduct")
const updateproduct = require("../../usecase/product/updateProduct")
const addProductVarient = require("../../usecase/productVarient/addVarient")
const deleteAllVarient = require("../../usecase/productVarient/deleteAllVarient")
const deletevarient = require("../../usecase/productVarient/deleteVarient")
const updatevarient = require("../../usecase/productVarient/updateVarient")
const productRepository = require("../repositories/productRepository")
const productVarientRepository = require("../repositories/productVarientRepository")

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



    }
}