module.exports = async (cartRepository, varientRepository, userId, productId) => {
    const count = varientRepository.stockCount(productId)
    if (count > 0)
        return await cartRepository.addToCart(userId, productId)
    else
        return false
}