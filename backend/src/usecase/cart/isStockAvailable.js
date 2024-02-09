module.exports = async (productVarientRepository, productId,quantity) => {
    const count = await productVarientRepository.countStock(productId)
    if (count >= quantity)
        return true
    else
        return false
}