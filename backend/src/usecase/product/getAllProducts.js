const getAllProducts = async(productRepository,page,limit) => {
    const result=await productRepository.getAll(page,limit)
    return result
}
module.exports=getAllProducts