const Category = require("../../entity/categoryEntity")
const updateCategory=async(data,categoryRepository)=>{
    const categoryData = new Category(data)
    return await categoryRepository.update(categoryData,data.id)
}

module.exports=updateCategory