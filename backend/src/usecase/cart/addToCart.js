module.exports=async (cartRepository,userId,data)=>{
    return await cartRepository.addToCart(userId,data)
}