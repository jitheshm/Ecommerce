module.exports = async (cartRepository, productVarientRepository, userId, productId) => {
    const count = await productVarientRepository.countStock(productId)
    if (count > 0)
        return await cartRepository.addToCart(userId, productId)
    else
        return false
}