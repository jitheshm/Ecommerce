
const deleteCategory=async(id,categoryRepository)=>{
   
   const status= await categoryRepository.delete(id)
   return status
}

module.exports=deleteCategory