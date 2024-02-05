const productListChange=async(productRepository,id)=>{
    const status=productRepository.productListChange(id)
    return status
}

module.exports=productListChange