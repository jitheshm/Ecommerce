const addToCart = require("../../usecase/cart/addToCart")
const cartRepository = require("../repositories/cartRepository")

module.exports={
    addToCart: async (userId, data) => {
        return await addToCart(cartRepository,userId,data)
        

    }
}