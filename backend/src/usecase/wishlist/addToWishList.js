module.exports = async (userId, productVarientId, wishlistRepository) => {
    return await wishlistRepository.addToWishlist(userId, productVarientId)
}