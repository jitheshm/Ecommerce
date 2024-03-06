
module.exports = async (razorpayGateway, data, razorpaykey_id, razorpaykey_secret) => {
    
    const razOrder = await razorpayGateway.createOrder(razorpaykey_id, razorpaykey_secret, data.amountPaid, data.orderId,);
    return razOrder;
}