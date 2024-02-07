module.exports=async(addressRepository,id)=>{
    return await addressRepository.findAddress(id)
}