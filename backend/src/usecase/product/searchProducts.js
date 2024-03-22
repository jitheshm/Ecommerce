module.exports = async (productVarientRepository, searchQuery, sort,filter,page,limit) => {
    return await productVarientRepository.searchProducts(searchQuery, sort,filter,page,limit)
}