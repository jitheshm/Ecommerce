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
    getAllOffers: async (page, limit) => {
        try {
            const offers = await OfferModel.aggregate([
                {
                    $unwind: "$applicables"
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "applicables",
                        foreignField: "_id",
                        as: "offerProducts"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "applicables",
                        foreignField: "_id",
                        as: "offerCategories"
                    }
                },
                {
                    $skip: (page - 1) * limit
                },
                {
                    $limit: limit
                }
            ]);
            const totalCount = await OfferModel.countDocuments();
            const totalPages = Math.ceil(totalCount / limit);
            return { offers, totalPages };
        } catch (err) {
            throw new Error(err);
        }
    },
    getOffer: async (id) => {
        try {
            const offer = await OfferModel.aggregate([
                {
                    $match: { _id: id }
                },
                {
                    $unwind: "$applicables"
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "applicables",
                        foreignField: "_id",
                        as: "offerProducts"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "applicables",
                        foreignField: "_id",
                        as: "offerCategories"
                    }
                }
            ]);
            console.log(offer);
            return offer;
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