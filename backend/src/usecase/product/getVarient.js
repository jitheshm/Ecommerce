const getVarient=async(id,productVarientRepository)=>{
    const result=await productVarientRepository.getVarient(id)
    return result
}

module.exports=getVarient