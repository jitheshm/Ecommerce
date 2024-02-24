const UserModel = require('../models/userModel')
module.exports = {
    addToWishlist: async (userId, productVarientId) => {
        try {
            const result = await UserModel.updateOne({ _id: userId }, { $push: { wishlist: { productVarientId: productVarientId } } })
            if (result.matchedCount === 0)
                return false
            else
                return true
        }
        catch (error) {
            console.log(error);
            throw error
        }
    },
    checkWishlist: async (userId, productVarientId) => {
        try {
            console.log(productVarientId, "ll");
            const result = await UserModel.findOne({ _id: userId, wishlist: { $elemMatch: { productVarientId: productVarientId } } })
            if (result)
                return true
            else
                return false
        }
        catch (error) {
            console.log(error);
            throw error
        }
    },
    removeFromWishlist: async (userId, productVarientId) => {
        try {
            const result = await UserModel.updateOne({ _id: userId }, { $pull: { wishlist: { productVarientId: productVarientId } } })
            if (result.matchedCount === 0)
                return false
            else
                return true
        }
        catch (error) {
            console.log(error);
            throw error
        }
    },
    getWishList: async (userId) => {
        try {
            const wishlist = await UserModel.aggregate([
                {
                    $match: {
                        _id: userId
                    }
                },
                {
                    $unwind: "$wishlist"
                },
                {
                    $lookup: {
                        from: "productvarients",
                        localField: "wishlist.productVarientId",
                        foreignField: "_id",
                        as: "wishlist.productVarient"
                    }
                },
                {
                    $unwind: "$wishlist.productVarient"
                },
                {

                    $lookup: {
                        from: "products",
                        localField: "wishlist.productVarient.productId",
                        foreignField: "_id",
                        as: "wishlist.productDetails"
                    }
                },
                {
                    $unwind: "$wishlist.productDetails"
                },
                {
                    $project: {
                        _id: 0,
                        productVarientId: "$wishlist.productVarientId",
                        productVarient: "$wishlist.productVarient",
                        productDetails:"$wishlist.productDetails"
                    }
                }
            ]).exec()
            console.log(wishlist);
            return wishlist
        } catch (error) {

        }
    }
}