module.exports = async (offerRepository,page, limit) => {
    return await offerRepository.getAllOffers(page, limit)
}