

module.exports = async (userId, productVarientId, wishlistRepository) => {
    return await wishlistRepository.checkWishlist(userId, productVarientId)
}