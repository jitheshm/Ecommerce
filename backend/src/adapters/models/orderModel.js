const mongoose = require('mongoose');
const Schema = mongoose.Schema



const OrderSchema = new mongoose.Schema({
    userId: { type: Schema.ObjectId, required: true },
    orderAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    deliveryAddress: { type: Object, required: true },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: String },
    orderedItems: {
        type: [{
            productId: { type: Schema.ObjectId, required: true },
            quantity: { type: Number, required: true },
            salePrice: { type: Number, required: true },
            discount: { type: Number, required: true },
            totalprice: { type: Number, required: true },
            deliveryStatus: { type: String, default: "pending", required: true },
            returnStatus: { type: String, default: "Not Requested" },
            returnReason: { type: String, default: "Not Requested" }
        }], required: true
    },
    coupon: {
        type: {
            couponId: { type: String },
            discount: { type: Number },

        }
    },
    offer: { type: String },

    transactionId: { type: String, required: true, default: "Not Paid" },


});

// OrderSchema.pre('find', async function (next) {
//     if (typeof this.userId === 'string') {
//         // Convert the userId string to an ObjectId
//         this.userId = mongoose.Types.ObjectId(this.userId);
//     }
//     if (Array.isArray(this.orderedItems)) {
//         this.orderedItems.forEach(item => {
//             if (typeof item.productId === 'string') {
//                 // Convert the productId string to an ObjectId
//                 item.productId = mongoose.Types.ObjectId(item.productId);
//             }
//         });
//     }
//     next();
// });



const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;