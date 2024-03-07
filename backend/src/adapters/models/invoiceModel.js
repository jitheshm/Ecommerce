const mongoose = require('mongoose');
var Schema = mongoose.Schema
const InvoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    orderId: {
        type: Schema.ObjectId,
        required: true
    },

    date: {
        type: Date,
        required: true
    },



});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;