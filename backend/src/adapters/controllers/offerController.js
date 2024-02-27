const addOffer = require("../../usecase/offer/addOffer")
const deleteOffer = require("../../usecase/offer/deleteOffer")
const getAllOffers = require("../../usecase/offer/getAllOffers")
const getOffer = require("../../usecase/offer/getOffer")
const updateOffer = require("../../usecase/offer/updateOffer")
const offerRepository = require("../repositories/offerRepository")

module.exports={
    addOffer: async (data) => {
        return await addOffer(data, offerRepository)
    },
    getAllOffers:async () => {
        return await getAllOffers(offerRepository)
    },
    getOffer: async (id) => {
        return await getOffer(id, offerRepository)
    },
    updateOffer: async (data) => {
        return await updateOffer(data, offerRepository)
    },
    deleteOffer: async (id) => {
        return await deleteOffer(id, offerRepository)
    },
}