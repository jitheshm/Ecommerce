module.exports = async (userId, productVarientId, wishlistRepository) => {
    return await wishlistRepository.removeFromWishlist(userId, productVarientId)
}