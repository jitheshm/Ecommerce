const getVarientDetails=async(color,id,productVarientRepository)=>{
const varientDetail=await productVarientRepository.getVarientDetails(color,id)
return varientDetail
}

module.exports=getVarientDetails