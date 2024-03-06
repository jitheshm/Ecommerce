

module.exports = async (orderRepository, orderId) => {
    return await orderRepository.getOrder(orderId)
}
