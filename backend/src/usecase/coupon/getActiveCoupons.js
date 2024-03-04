module.exports = async (couponRepository) => {
 
    return await couponRepository.getActiveCoupons()
}