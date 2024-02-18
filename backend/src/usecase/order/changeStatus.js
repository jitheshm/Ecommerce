module.exports = async (orderRepository, orderId, userId,productId, orderStatus) => {
    return await orderRepository.changeOrderStatus(orderId, userId,productId, orderStatus)
}