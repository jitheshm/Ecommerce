
const deleteproduct = async (proId,productRepository) => {
  
    
    const status = await productRepository.deleteProduct(proId)
    return status


}

module.exports=deleteproduct