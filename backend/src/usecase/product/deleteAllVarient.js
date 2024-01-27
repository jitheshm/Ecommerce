const deleteAllVarient = async (productId, productVarientRepository) => {
    const delDoc = await productVarientRepository.deleteAllVarient(productId)
    return delDoc
}

module.exports = deleteAllVarient