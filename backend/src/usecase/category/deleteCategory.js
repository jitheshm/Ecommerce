
const deleteCategory=async(id,categoryRepository)=>{
   
    await categoryRepository.delete(id)
}

module.exports=deleteCategory