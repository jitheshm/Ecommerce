const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  gender: { type: String },
  email: { type: String },
  phone: { type: Number },
  isBlocked: { type: Boolean, required: true },
  isVerified: { type: Boolean, required: true },
  password: { type: String },
  authenticationId: { type: String },
  authenticationProvider: { type: String },
  
  dateOfJoin: { type: String, required: true, default: Date.now },
  wishlist: {
    type: [{

      productVarientId: { type: mongoose.Schema.Types.ObjectId }

    }]
  }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;