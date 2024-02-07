const mongoose = require('mongoose');
var Schema = mongoose.Schema

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    userId: { type: Schema.ObjectId, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    addressType: { type: String, required: true }


});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;