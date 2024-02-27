const OfferModel = require('../models/offerModel');
module.exports = {
    addOffer: (data) => {
        try {
            const offer = new OfferModel(data);
            offer.save();
        } catch (err) {
            throw new Error(err);
        }
    },
    getAllOffers: async () => {
        try {
            return await OfferModel.find();
        } catch (err) {
            throw new Error(err);
        }
    }
}