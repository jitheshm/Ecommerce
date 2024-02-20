const Order = require("../../entity/orderEntity")

module.exports = async (orderRepository, orderId, userId, productId, reason) => {
    const existOrder = await orderRepository.getSpecificOrder(orderId, productId)
    const order = new Order(existOrder[0])
    console.log(order);
    if (order.isReturnAvailable()) {
        return await orderRepository.returnProduct(orderId, userId, productId, reason)
    }

}