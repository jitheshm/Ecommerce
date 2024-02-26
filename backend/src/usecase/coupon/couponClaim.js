module.exports = async (id, userId, couponRepository) => {
    return await couponRepository.couponClaim(id, userId)
}