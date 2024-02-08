module.exports = async (cartRepository, varientRepository, userId, productId, quantity) => {

    const count = await varientRepository.countStock(productId)
    return await cartRepository.changeQuantity(userId, productId, quantity, count)
}