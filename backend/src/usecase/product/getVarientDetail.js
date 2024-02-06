const getVarientDetails=async(color,productVarientRepository)=>{
const varientDetail=await productVarientRepository.getVarientDetails(color)
return varientDetail
}

module.exports=getVarientDetails