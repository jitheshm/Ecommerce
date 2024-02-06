const getColorList = async(productVarientRepository, id) => {
    const colorList = await productVarientRepository.getColorList(id)
    return colorList
}
module.exports = getColorList