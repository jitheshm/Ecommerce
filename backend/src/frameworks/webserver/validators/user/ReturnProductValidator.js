const orderRepository = require("../../../../adapters/repositories/orderRepository");
const { ObjectId } = require('mongodb')
const moment = require('moment');

module.exports = () => {
    const valObj = {
        "orderId": {
            notEmpty: {
                errorMessage: "orderId is required"
            },
            custom: {
                options: async (value, { req }) => {
                    console.log(req.params.productId);
                    const order = await orderRepository.getSpecificOrder(new ObjectId(value), new ObjectId(req.params.productId)); // Pass the productId as an argument
                    if (order.length === 0) {
                        throw new Error('Order not found');

                    }
                    else if (order[0].orderStatus != 'Delivered') {
                        throw new Error('You can return product only after delivery.');
                    }
                    else {

                        if (!moment(order[0].deliveryDate, 'DD-MM-YYYY').add(7, 'days').isAfter(moment())) {
                            throw new Error('You can return product within 7 days of delivery date.');
                        }
                    }


                },
                // errorMessage: 'You can return product within 7 days of delivery date.'
            }
        },

        "productId": {
            notEmpty: {
                errorMessage: "productId is required"
            }
        },

    };
    return valObj;
};
