module.exports = async(orderRepository, orderId, userId, productId) => {
    return await orderRepository.returnProduct(orderId, userId, productId)
}