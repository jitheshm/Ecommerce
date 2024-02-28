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
    },
    getOffer: (id) => {
        try {
            return OfferModel.findOne({ _id: id });
        } catch (err) {
            throw new Error(err);
        }
    },
    updateOffer: async (id, data) => {
        try {
            const res = await OfferModel.updateOne({ _id: id }, { $set: { ...data } });
            if (res.modifiedCount === 0) {
                return false
            } else
                return true

        } catch (error) {
            throw new Error(error);
        }
    },
    deleteOffer: async (id) => {
        try {
            const status = await OfferModel.deleteOne({ _id: id })
            if (status.deletedCount === 0) {
                return false
            }
            return true
        } catch (error) {
            throw new Error(error);
        }
    },
    getAvailableOffers: async (productId, categoryId) => {
        try {
            console.log();
            const currentDate = new Date();
            const offers = await OfferModel.find({ 
                applicables: { $in: [productId, categoryId] },
                endDate: { $gte: currentDate }
            });
            console.log(offers);
            return offers;
        } catch (err) {
            throw new Error(err);
        }
    }
}