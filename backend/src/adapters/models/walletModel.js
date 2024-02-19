const mongoose = require('mongoose');
var Schema = mongoose.Schema
const WalletSchema = new mongoose.Schema({
    userId: { type: Schema.ObjectId, required: true },
    balance: { type: Number, required: true, default: 0 },
    transactions: {
        type: [{
            transactionId: { type: String, required: true },
            amount: { type: Number, required: true },
            type: { type: String, required: true },
            date: { type: Date, required: true }
        }]
    },


});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;