const addCategory = require("../../usecase/category/addCategory")
const deleteCategory = require("../../usecase/category/deleteCategory")
const getCategory = require("../../usecase/category/getCategory")
const updateCategory = require("../../usecase/category/updateCategory")
const categoryRepository = require("../repositories/categoryRepository")

module.exports = {
    categoryAdd: async(data) => {
        await addCategory(data,categoryRepository)
    },
    categoryUpdate:async(data)=>{
        await updateCategory(data,categoryRepository)

    },
    categoryDelete:async(id)=>{
        await deleteCategory(id,categoryRepository)

    },
    getCategory:async ()=>{
        const result=await getCategory(categoryRepository)
        return result
    }
}