const editProduct=async(id,productRepository)=>{
    const product=await productRepository.getproduct(id)
    return product
}
module.exports=editProduct