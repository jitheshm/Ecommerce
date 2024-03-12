const getOneVarientPerProduct = async (productVarientRepository,filter) => {
    const products = await productVarientRepository.getOneVarientPerProduct(filter)
    return products
}
module.exports = getOneVarientPerProduct