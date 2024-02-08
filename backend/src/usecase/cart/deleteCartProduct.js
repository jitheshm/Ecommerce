module.exports=async(cartRepository,userId,productId)=>{
    return await cartRepository.removeCartProduct(userId,productId)
}