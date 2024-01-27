const Product = require("../../entity/productEntity")

const updateproduct = async (data, productRepository) => {
    const proData = new Product(data)
    console.log(proData);
    const status = await productRepository.updateProduct(proData, data.id)
    return status


}

module.exports=updateproduct