const getCategory = async (categoryRepository,page, limit) => {
    const result = await categoryRepository.getCategory(page, limit)
    return result
}

module.exports = getCategory