const mongoose = require('mongoose');
var Schema = mongoose.Schema
const OfferSchema = new mongoose.Schema({
    offerTitle: {
        type: String,
        required: true,

    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,

    },
    offerDetails: {
        type: String,
        required: true,


    },
    discountType: {
        type: String,
        required: true,

    },
    discount: {
        type: Number,
        required: true,

    },
    offerType: {
        type: String,
        required: true,

    },
    applicables: [{
        type: Schema.ObjectId,
        required: true,

    }]


});

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;