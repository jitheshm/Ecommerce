const getAllProducts = async(productRepository) => {
    const result=await productRepository.getAll()
    return result
}
module.exports=getAllProducts