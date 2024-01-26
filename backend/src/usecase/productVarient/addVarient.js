const ProductVarient = require("../../entity/productVarientEntity")


const addProductVarient = async (varientData, productVarientRepository) => {
    const productVarient=new ProductVarient(varientData)
    console.log(productVarient);
    const productVId=await productVarientRepository.addProductVarient(productVarient)
    return productVId



}

module.exports = addProductVarient