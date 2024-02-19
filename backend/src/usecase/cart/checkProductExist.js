module.exports = async (cartRepository, productId, userId) => {
    const cart = await cartRepository.checkProductExist(productId, userId)
    if (cart.length > 0) {
        return true
    }
    return false
}