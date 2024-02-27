const addOffer = require("../../usecase/offer/addOffer")
const offerRepository = require("../repositories/offerRepository")

module.exports={
    addOffer: async (data) => {
        return await addOffer(data, offerRepository)
    }
}