const deletevarient = async (varientId, productVarientRepository) => {
    const status = await productVarientRepository.deleteVarient(varientId)
    return status
}

module.exports = deletevarient