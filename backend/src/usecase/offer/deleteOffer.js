module.exports=async(id,offerRepository)=>{
    return await offerRepository.deleteOffer(id)
}