const Product = require("../../entity/productEntity")


const addProduct = async (prodData, productRepository) => {
    const product=new Product(prodData)
    const productId=await productRepository.addProduct(product)
    return productId



}

module.exports = addProduct