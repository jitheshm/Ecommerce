const getCategory = async (categoryRepository) => {
    const result = await categoryRepository.getCategory()
    return result
}

module.exports = getCategory