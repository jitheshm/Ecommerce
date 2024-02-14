const Category = require("../../entity/categoryEntity")

const addCategory = async (data, categoryRepository) => {
    if (!/^[^\s]{3}[\s\S]*$/.test(data.category) || data.category === undefined || data.category === null || data.category === '') {
        const error = new Error("Invalid category name")
        error.statusCode = 400
        throw error
    }
    const categoryData = new Category(data)
    await categoryRepository.create(categoryData)
}

module.exports = addCategory