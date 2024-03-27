const Offer = require("../../entity/offerEntity");

module.exports = async (id, data, offerRepository) => {
    const offer = new Offer(data)
    return await offerRepository.updateOffer(id, offer)
}