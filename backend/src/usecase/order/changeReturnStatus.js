module.exports = async (orderRepository, walletRepository, orderId, productId, status) => {
    await orderRepository.changeReturnStatus(orderId, productId, status)
    const order = await orderRepository.getOrderSpecificProduct(orderId, productId)
    if (status === 'Refund') {
        console.log("haii");
        return await walletRepository.addFund(order[0].userId, order[0].orderedItems.price, 'Refund')
    }
}