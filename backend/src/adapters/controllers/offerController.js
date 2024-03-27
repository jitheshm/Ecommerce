const addOffer = require("../../usecase/offer/addOffer")
const deleteOffer = require("../../usecase/offer/deleteOffer")
const getAllOffers = require("../../usecase/offer/getAllOffers")
const getAvailableOffers = require("../../usecase/offer/getAvailableOffers")
const getOffer = require("../../usecase/offer/getOffer")
const updateOffer = require("../../usecase/offer/updateOffer")
const offerRepository = require("../repositories/offerRepository")

module.exports = {
    addOffer: async (data) => {
        return await addOffer(data, offerRepository)
    },
    getAllOffers: async (page, limit) => {
        return await getAllOffers(offerRepository,page, limit)
    },
    getOffer: async (id) => {
        return await getOffer(id, offerRepository)
    },
    updateOffer: async (id,data) => {
        return await updateOffer(id,data, offerRepository)
    },
    deleteOffer: async (id) => {
        return await deleteOffer(id, offerRepository)
    },
    getAvailableOffers: async (productId, categoryId) => {
        console.log(productId, categoryId);
        return await getAvailableOffers(productId, categoryId, offerRepository)
    }
}