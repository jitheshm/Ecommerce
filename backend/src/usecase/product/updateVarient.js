const ProductVarient = require("../../entity/productVarientEntity")

function validateVarientData(varientData) {
    const colorRegex = /^[^\s]{3,}/;
    const positiveNumberRegex = /^\d+$/;

    if (!colorRegex.test(varientData.color)) {
        throw new Error('Color should have at least 3 non-space characters at the start');
    }

    if (!positiveNumberRegex.test(varientData.stock) || !Number.isInteger(Number(varientData.stock))) {
        throw new Error('Stock should be a positive integer');
    }

    if (!positiveNumberRegex.test(varientData.salePrice)) {
        throw new Error('Sale price should be a positive number');
    }

    if (!positiveNumberRegex.test(varientData.actualPrice)) {
        throw new Error('Actual price should be a positive number');
    }
}

const updatevarient = async (data, productVarientRepository) => {
    validateVarientData(data);
    const productVarient = new ProductVarient(data)
    console.log(productVarient);
    const status = await productVarientRepository.updateProductVarient({ ...productVarient, id: data.id, oldImageUrl: data.oldImageUrl })
    return status
}

module.exports = updatevarient