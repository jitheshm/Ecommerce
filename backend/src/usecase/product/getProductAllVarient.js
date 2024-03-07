const getProductAllVarient=(productVarientRepository,id,page, limit)=>{
    const result= productVarientRepository.getProductAllVarient(id,page, limit)
    return result
}
module.exports=getProductAllVarient