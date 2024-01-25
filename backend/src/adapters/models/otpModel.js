const mongoose = require('mongoose');
var Schema = mongoose.Schema
const OtpSchema = new mongoose.Schema({
  otp:{ type: String, required: true },
  userId:{ type: Schema.ObjectId, required: true },
  createdAt: { type: Date, expires: '3m', default: Date.now }

});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports =Otp;