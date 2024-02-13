module.exports = async (productVarientRepository, searchQuery, sort,filter) => {
    return await productVarientRepository.searchProducts(searchQuery, sort,filter)
}