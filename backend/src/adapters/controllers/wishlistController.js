const addToWishList = require("../../usecase/wishlist/addToWishList")
const checkWishlist = require("../../usecase/wishlist/checkWishlist")
const getWishList = require("../../usecase/wishlist/getWishList")
const removeFromWishlist = require("../../usecase/wishlist/removeFromWishlist")
const userRepository = require("../repositories/userRepository")
const wishlistRepository = require("../repositories/wishlistRepository")

module.exports = {
    addToWishlist: async (userId, productVarientId) => {
        return await addToWishList(userId, productVarientId, wishlistRepository)
    },
    checkWishlist: async (userId, productVarientId) => {
        return await checkWishlist(userId, productVarientId, wishlistRepository)
    },
    removeFromWishlist: (userId, productVarientId) => {
        return removeFromWishlist(userId, productVarientId, wishlistRepository)
    },
    getWishlist:async(userId)=>{
        return await getWishList(userId, wishlistRepository)
    }
}