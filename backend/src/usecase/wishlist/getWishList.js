module.exports=async(userId, wishlistRepository)=>{
    return await wishlistRepository.getWishList(userId)
}