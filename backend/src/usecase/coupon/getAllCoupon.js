module.exports = async (couponRepository,page, limit) => {
    return await couponRepository.getAllCoupon(page, limit)
}