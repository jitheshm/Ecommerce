const mongoose = require('mongoose');
var Schema = mongoose.Schema
const OtpSchema = new mongoose.Schema({
  otp:{ type: String, required: true },
  userId:{ type: Schema.ObjectId, required: true },
  create:{ type: String, required: true }

});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports =Otp;