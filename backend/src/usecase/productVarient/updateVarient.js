const ProductVarient = require("../../entity/productVarientEntity")
const updatevarient = async(data, productVarientRepository) => {
    const productVarient = new ProductVarient(data)
    console.log(productVarient);
    await productVarientRepository.updateProductVarient({ ...productVarient, id: data.id, oldImageUrl: data.oldImageUrl })

}

module.exports = updatevarient