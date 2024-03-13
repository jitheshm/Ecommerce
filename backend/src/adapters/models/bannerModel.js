const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,

    },
    imagesUrl: {
        type: Array,
        required: true,

    },
    link: {
        type: String,

    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;