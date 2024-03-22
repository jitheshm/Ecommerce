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
const productListChange = require("../../usecase/product/productListChange")
const getColorList = require("../../usecase/product/getColorList")
const viewProduct = require("../../usecase/product/viewProduct")
const getProductAllVarient = require("../../usecase/product/getProductAllVarient")
const searchProducts = require("../../usecase/product/searchProducts")
const getNewProducts = require("../../usecase/product/getNewProducts")

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
        const status = await updatevarient(varientData, productVarientRepository)
        return status
    },
    varientDelete: async (varientId) => {
        const status = await deletevarient(varientId, productVarientRepository)
        return status
    },
    productUpdate: async (data) => {
        const status = await updateproduct(data, productRepository)
        return status
    },
    productDelete: async (proId) => {
        const status = await deleteproduct(proId, productRepository)
        if (status) {
            const status = await deleteAllVarient(proId, productVarientRepository)
            return status
        } else
            return status



    },
    getOneVarientPerProduct: async (filter) => {
        const products = await getOneVarientPerProduct(productVarientRepository,filter)
        return products
    },
    getVarientDetail: async (color, id) => {
        const varientDetail = await getVarientDetails(color, id, productVarientRepository)
        return varientDetail
    },
    editProduct: async (id) => {
        const result = await editProduct(id, productRepository)
        return result
    },
    getAllProducts: async (page, limit) => {
        const result = await getAllProducts(productRepository, page, limit)
        return result
    },
    getVarient: async (id) => {
        const result = await getVarient(id, productVarientRepository)
        return result
    },
    productListChange: async (id) => {
        const status = await productListChange(productRepository, id)
        return status
    },
    getcolorlist: async (id) => {
        const result = await getColorList(productVarientRepository, id)
        return result
    },
    viewProduct: async (id) => {
        const result = await viewProduct(productRepository, id)
        return result
    },
    getProductAllVarient: async (id, page, limit) => {
        const result = await getProductAllVarient(productVarientRepository, id, page, limit)
        return result
    },
    searchProducts: async (searchQuery, sort, filter,page,limit) => {
        const result = await searchProducts(productVarientRepository, searchQuery, sort, filter,page,limit)
        return result
    },
    getNewProducts: async () => {
        const result = await getNewProducts(productVarientRepository)
        return result
    },
    
}