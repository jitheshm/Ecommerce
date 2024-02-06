const viewProduct=async(productRepository,id)=>{
    const product=await productRepository.getproduct(id)
    return product
}
module.exports=viewProduct