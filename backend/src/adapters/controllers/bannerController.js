const bannerAdd = require("../../usecase/Banner/bannerAdd")
const bannerStatusChange = require("../../usecase/Banner/bannerStatusChange")
const updateBanner = require("../../usecase/Banner/bannerUpdate")
const getAllBanner = require("../../usecase/Banner/getAllBanner")
const getBanner = require("../../usecase/Banner/getBanner")
const getDisplayBanners = require("../../usecase/Banner/getDisplayBanners")
const bannerRepository = require("../repositories/bannerRepository")
module.exports = {
    bannerAdd: async (data) => {
        return await bannerAdd(data, bannerRepository)
    },
    bannerUpdate: (data) => {
        return updateBanner(data, bannerRepository)
    },
    statusChange: async (id, status,) => {
        return await bannerStatusChange(id, status,bannerRepository)
    },
    getBanner: async (id) => {
        return await getBanner(id, bannerRepository)
    },
    getAllBanner: async (page, limit) => {
        return await getAllBanner(bannerRepository,page, limit)
    },
    getDisplayBanners: async () => {
        return await getDisplayBanners(bannerRepository)
    },
}