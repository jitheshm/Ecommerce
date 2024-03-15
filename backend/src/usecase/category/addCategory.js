const Category = require("../../entity/categoryEntity")

const addCategory = async (data, categoryRepository) => {
    const categoryData = new Category(data)
    return await categoryRepository.create(categoryData)
}

module.exports = addCategory