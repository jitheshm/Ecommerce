const BannerModel = require("../models/bannerModel")

module.exports = {
    bannerAdd: async (data) => {
        try {
            await new BannerModel(data).save()
            return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    bannerUpdate: async (data, id) => {
        try {
            return await BannerModel.findOneAndUpdate({ _id: id }, data)

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    statusChange: async (id, status) => {
        try {
            return await BannerModel.updateOne({ _id: id }, { isActive: status })
        } catch (error) {
            console.log(error);
            throw error
        }


    },
    getBanner: async (id) => {
        try {
            return await BannerModel.findOne({ _id: id })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getAllBanners: async () => {
        try {
            return await BannerModel.find()
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getDisplayBanners: async () => {
        try {
            return await BannerModel.aggregate([
                {
                    $match: {
                        isActive: true,
                        $expr: {
                            $lte: ["$startDate", new Date()]
                        },
                        $expr: {
                            $gte: ["$endDate", new Date()]
                        }
                    }

                },

            ]).exec()
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}