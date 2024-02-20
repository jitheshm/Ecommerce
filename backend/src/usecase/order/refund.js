module.exports = async (orderId, productId, status, orderRepository, walletRepository,) => {
    const order = await orderRepository.getOrderSpecificProduct(orderId, productId)
    if (order) {
        return await walletRepository.addFund(order[0].userId, order[0].orderedItems.price, 'Refund')
    }
}