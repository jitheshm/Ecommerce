module.exports = async (orderRepository, orderId, userId, orderStatus) => {
    return await orderRepository.changeOrderStatus(orderId, userId, orderStatus)
}