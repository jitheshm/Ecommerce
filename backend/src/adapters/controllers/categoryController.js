const addCategory = require("../../usecase/category/addCategory")
const deleteCategory = require("../../usecase/category/deleteCategory")
const getCategory = require("../../usecase/category/getCategory")
const getSpecificCategory = require("../../usecase/category/getSpecificCategory")
const updateCategory = require("../../usecase/category/updateCategory")
const categoryRepository = require("../repositories/categoryRepository")

module.exports = {
    categoryAdd: async(data) => {
        return await addCategory(data,categoryRepository)
    },
    categoryUpdate:async(data)=>{
        return await updateCategory(data,categoryRepository)

    },
    categoryDelete:async(id)=>{
        const status=await deleteCategory(id,categoryRepository)
        return status

    },
    getCategory:async (page, limit)=>{
        const result=await getCategory(categoryRepository,page, limit)
        return result
    },
    getSpecificCategory:async(id)=>{
        const result=await getSpecificCategory(categoryRepository,id)
        return result
    }
}