const Order = require("../../entity/orderEntity")

module.exports = async (orderRepository, addressRepository, razorpayGateway, data, razorpaykey_id, razorpaykey_secret) => {
    console.log(data);
    const deliveryAddress = await addressRepository.findAddress(data.deliveryAddress)
    const { _id, userId, __v, ...address } = deliveryAddress._doc

    data.deliveryAddress = address
    data.transactionId = "pending"
    const order = new Order(data)

    const reciept = await orderRepository.placeOrder(order)



    console.log(reciept);
    const razOrder = await razorpayGateway.createOrder(razorpaykey_id, razorpaykey_secret, data.orderAmount, reciept._id,);
    return razOrder;
}