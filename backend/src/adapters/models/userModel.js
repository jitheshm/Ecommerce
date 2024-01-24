const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:{ type: String, required: true },
  age:String,
  gender:String,
  email:{ type: String, required: true },
  phone:Number,
  image:String,
  isBlocked:Boolean,
  isVerified:Boolean,
  password:{ type: String, required: true },
  dateOfJoin:{ type: String, required: true },
  cart:Array,
  wishlist:Array

});

const User = mongoose.model('User', UserSchema);

module.exports = User;