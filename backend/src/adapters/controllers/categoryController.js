const addCategory = require("../../usecase/category/addCategory")
const updateCategory = require("../../usecase/category/updateCategory")
const categoryRepository = require("../repositories/categoryRepository")

module.exports = {
    categoryAdd: async(data) => {
        await addCategory(data,categoryRepository)
    },
    categoryUpdate:async(data)=>{
        await updateCategory(data,categoryRepository)

    }
}