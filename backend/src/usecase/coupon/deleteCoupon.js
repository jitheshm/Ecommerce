module.exports=async(id,couponRepository)=>{
    return await couponRepository.deleteCoupon(id)
}