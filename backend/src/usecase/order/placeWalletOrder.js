const Order = require("../../entity/orderEntity")

module.exports = async (orderRepository, addressRepository, cartRepository, productVarientRepository, walletRepository, data) => {

    const deliveryAddress = await addressRepository.findAddress(data.deliveryAddress)
    console.log(data);
    const { _id, userId, __v, ...address } = deliveryAddress._doc

    data.deliveryAddress = address

    data.orderedItems = data.orderedItems.map((product) => {
        return {
            ...product,
            deliveryStatus: 'Confirmed',
        }
    })
    data.paymentMethod = "Wallet"
    const tid = await walletRepository.useFund(data.userId, data.amountPaid, "debit")
    console.log(tid, "kk");
    if (!tid)
        return null
    data.transactionId = tid
    data.paymentStatus = "Payment Successfully"
    const order = new Order(data)


    const reciept = await orderRepository.placeOrder(order)

    productVarientRepository.stockUpdate(data.orderedItems)
    await walletRepository.useFund(data.userId, data.orderAmount, "debit")



    const status = await cartRepository.clearUserCart(data.userId)
    if (!status)
        console.log("error in clearing cart after placing order");

    return reciept
}