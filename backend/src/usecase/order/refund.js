module.exports = async (orderId, productId, status, orderRepository, walletRepository,) => {
    const order = await orderRepository.getOrderSpecificProduct(orderId, productId)
    if (order) {
        
        //console.log(order[0].orderedItems.price, order[0].discount, order[0].orderedItems.price - order[0].discount);
        return await walletRepository.addFund(order[0].userId, order[0].orderedItems.totalprice - order[0].discount, 'Refund')
    }
}