const getOneVarientPerProduct = async (productVarientRepository) => {
    const products = await productVarientRepository.getOneVarientPerProduct()
    return products
}
module.exports = getOneVarientPerProduct