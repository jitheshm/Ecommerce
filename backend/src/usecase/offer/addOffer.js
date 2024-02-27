const Offer = require("../../entity/offerEntity");

module.exports = async (data, offerRepository) => {
    const offer = new Offer(data);
    return await offerRepository.addOffer(offer);
}