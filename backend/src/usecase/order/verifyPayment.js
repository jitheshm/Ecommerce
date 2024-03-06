module.exports = async (data, secret, razorpayGateway, orderRepository, productVarientRepository,cartRepository) => {
    const status = razorpayGateway.verifyPayment(data, secret)
    if (status) {
        const order = await orderRepository.updateOrder(data.receiptId, data.paymentId, 'Confirmed','payment successfully')

        await productVarientRepository.stockUpdate(order.orderedItems)
        const status = await cartRepository.clearUserCart(data.userId)
        if (!status)
            console.log("error in clearing cart after placing order");
        return order
    }
    else
        return null



}