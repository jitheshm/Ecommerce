const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true },

    imagesUrl: { type: Array },
    isDeleted: { type: Boolean, required: true }

});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;