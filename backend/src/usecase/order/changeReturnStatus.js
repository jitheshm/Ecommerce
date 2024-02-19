module.exports = async (orderRepository, orderId, productId, status) => {
    return await orderRepository.changeReturnStatus(orderId, productId, status)
}