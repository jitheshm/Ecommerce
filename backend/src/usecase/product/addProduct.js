const Product = require("../../entity/productEntity")


const addProduct = async (prodData, productRepository) => {
    if (!/^[^\s]{3}[\s\S]*$/.test(prodData.productName) || prodData.productName === undefined || prodData.productName === null || prodData.productName === '') {
        const error = new Error("Invalid product name")
        error.statusCode = 400
        throw error
    }
    if (!/^[^\s]{3}[\s\S]*$/.test(prodData.brand) || prodData.brand === undefined || prodData.brand === null || prodData.brand === '') {
        const error = new Error("Invalid brand name")
        error.statusCode = 400
        throw error
    }
    if ( prodData.categoryId === undefined || prodData.categoryId === null || prodData.categoryId === '') {
        const error = new Error("Invalid category")
        error.statusCode = 400
        throw error
    }

    if (!/^[^\s]{3}[\s\S]*$/.test(prodData.aboutProduct) || prodData.aboutProduct === undefined || prodData.aboutProduct === null || prodData.aboutProduct === '') {
        const error = new Error("Invalid product description")
        error.statusCode = 400
        throw error
    }

    if (prodData.waranty < 0 || prodData.waranty > 10 || !/^[0-9]*\.?[0-9]+$/.test(prodData.waranty) || isNaN(prodData.waranty) || prodData.waranty === undefined || prodData.waranty === null || prodData.waranty === '') {
        const error = new Error("Invalid waranty")
        error.statusCode = 400
        throw error

    }

    const product = new Product(prodData)
    const productId = await productRepository.addProduct(product)
    return productId



}

module.exports = addProduct