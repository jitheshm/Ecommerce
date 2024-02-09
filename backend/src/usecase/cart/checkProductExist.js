module.exports = async (cartRepository, productId, userId) => {
    return await cartRepository.checkProductExist(productId, userId)
}