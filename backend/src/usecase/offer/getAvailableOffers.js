module.exports = async(productId, categoryId, offerRepository) => {
    return await offerRepository.getAvailableOffers(productId, categoryId)
} 