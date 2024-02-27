const addOffer = require("../../usecase/offer/addOffer")
const getAllOffers = require("../../usecase/offer/getAllOffers")
const offerRepository = require("../repositories/offerRepository")

module.exports={
    addOffer: async (data) => {
        return await addOffer(data, offerRepository)
    },
    getAllOffers:async () => {
        return await getAllOffers(offerRepository)
    },
}