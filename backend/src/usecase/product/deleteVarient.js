const deletevarient = async (varientId, productVarientRepository) => {
    const delDoc = await productVarientRepository.deleteVarient(varientId)
    return delDoc
}

module.exports = deletevarient