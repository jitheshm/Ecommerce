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
    },
    findWallet: async (userId) => {
        const wallet = await WalletModel.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $project: {
                    _id: 0,
                    balance: 1,
                    transactions: {
                        $sortArray: { input: "$transactions", sortBy: { date: -1 } }
                    }
                }
            }
        ]).exec()
        return wallet[0]
    }
}