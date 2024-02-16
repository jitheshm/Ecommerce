
const Razorpay = require('razorpay');
const razorpayUtils = require('razorpay/dist/utils/razorpay-utils')
const createOrder = async (key_id, key_secret, amount, id) => {

    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: id,

    };

    try {
        console.log(id);
        const razorpay = new Razorpay({ key_id, key_secret });
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
}

verifyPayment = (data, secret) => {
    console.log(data);
    const { validatePaymentVerification } = razorpayUtils
    const { signature, orderId, paymentId } = data
    return validatePaymentVerification({ "order_id": orderId, "payment_id": paymentId } ,signature, secret,)
}

module.exports = { createOrder, verifyPayment };