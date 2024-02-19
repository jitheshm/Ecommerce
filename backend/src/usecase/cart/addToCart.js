const Cart = require("../../entity/cartEntity")

module.exports = async (cartRepository, productVarientRepository, userId, productId) => {

    const cartObj = {
        productId: productId,
        quantity: 1
    }
    const data = new Cart(userId, cartObj)


    const count = await productVarientRepository.countStock(productId)
    const status = data.canChangeQuantity(count)
    if(status){
        return await cartRepository.addToCart(data)
    
    }else{
        return false
    }
    
}