const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String },
  gender: { type: String },
  email: { type: String, required: true },
  phone: { type: Number },
  image: { type: String },
  isBlocked: { type: Boolean, required: true },
  isVerified: { type: Boolean, required: true },
  password: { type: String, required: true },
  dateOfJoin: { type: String, required: true },
  wishlist: { type: Array }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;