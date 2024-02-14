const Product = require("../../entity/productEntity")

const updateproduct = async (data, productRepository) => {

    if (!/^[^\s]{3}[\s\S]*$/.test(data.productName) || data.productName === undefined || data.productName === null || data.productName === '') {
        const error = new Error("Invalid product name")
        error.statusCode = 400
        throw error
    }
    if (!/^[^\s]{3}[\s\S]*$/.test(data.brand) || data.brand === undefined || data.brand === null || data.brand === '') {
        const error = new Error("Invalid brand name")
        error.statusCode = 400
        throw error
    }
    if ( data.categoryId === undefined || data.categoryId === null || data.categoryId === '') {
        const error = new Error("Invalid category")
        error.statusCode = 400
        throw error
    }

    if (!/^[^\s]{3}[\s\S]*$/.test(data.aboutProduct) || data.aboutProduct === undefined || data.aboutProduct === null || data.aboutProduct === '') {
        const error = new Error("Invalid product description")
        error.statusCode = 400
        throw error
    }

    if (data.waranty < 0 || data.waranty > 10 || !/^[0-9]*\.?[0-9]+$/.test(data.waranty) || isNaN(data.waranty) || data.waranty === undefined || data.waranty === null || data.waranty === '') {
        const error = new Error("Invalid waranty")
        error.statusCode = 400
        throw error

    }

    const proData = new Product(data)
    console.log(proData);
    const status = await productRepository.updateProduct(proData, data.id)
    return status


}

module.exports=updateproduct