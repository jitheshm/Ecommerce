const getSpecificCategory = async (categoryRepository,id) => {
    const result = await categoryRepository.getSpecificCategory(id)
    return result
}

module.exports = getSpecificCategory