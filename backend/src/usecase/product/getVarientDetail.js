const getVarientDetails=async(id,productVarientRepository)=>{
const varientDetail=await productVarientRepository.getVarientDetails(id)
return varientDetail
}

module.exports=getVarientDetails