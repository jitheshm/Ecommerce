const Order = require("../../entity/orderEntity")

module.exports = async (orderRepository, addressRepository, cartRepository, productVarientRepository, data) => {


    const deliveryAddress = await addressRepository.findAddress(data.deliveryAddress)
    const { _id, userId, __v, ...address } = deliveryAddress._doc

    data.deliveryAddress = address
    
    const order = new Order(data)

    const reciept = await orderRepository.placeOrder(order)

    await productVarientRepository.stockUpdate(data.orderedItems)

    if (!data.directPurchase) {
        const status = await cartRepository.clearUserCart(data.userId)
        if (!status)
            console.log("error in clearing cart after placing order");
    }
    return reciept
}