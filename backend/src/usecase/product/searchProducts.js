module.exports = async (productVarientRepository, searchQuery, sort) => {
    return await productVarientRepository.searchProducts(searchQuery, sort)
}