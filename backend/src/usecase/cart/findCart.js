module.exports=async(cartRepository,userId)=>{
    return await cartRepository.getCart(userId)
}