const ProductVarient = require("../../entity/productVarientEntity")
const updatevarient = async(data, productVarientRepository) => {
    const productVarient = new ProductVarient(data)
    console.log(productVarient);
    const status=await productVarientRepository.updateProductVarient({ ...productVarient, id: data.id, oldImageUrl: data.oldImageUrl })
    return status
}

module.exports = updatevarient