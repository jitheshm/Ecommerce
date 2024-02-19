const WalletModel = require("../models/walletModel")

module.exports = {
    addFund: async (userId, amount, type) => {
        await WalletModel.updateOne({ userId: userId }, {
            $inc: { balance: amount },
            $push: {
                transactions: {
                    transactionId: new Date().getTime(),
                    amount: amount,
                    type: type,
                    date: new Date()
                }
            }
        }, { upsert: true })
    }
}