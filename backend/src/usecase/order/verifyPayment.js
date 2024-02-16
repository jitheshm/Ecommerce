module.exports = async (data, secret, razorpayGateway, orderRepository, productVarientRepository) => {
    const status = razorpayGateway.verifyPayment(data, secret)
    if (status) {
        const order = await orderRepository.updateOrder(data.receiptId, data.paymentId, 'Confirmed')

        await productVarientRepository.stockUpdate(order.orderedItems)
        return order
    }
    else
        return null



}