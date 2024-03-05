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
    },
    useFund: async (userId, amount, type) => {
        try {
            console.log(amount,"amount");
            const res = await WalletModel.findOneAndUpdate({
                userId: userId, balance: {
                    $gte: amount

                }
            }, {
                $inc: { balance: -amount },
                $push: {
                    transactions: {
                        transactionId: new Date().getTime(),
                        amount: amount,
                        type: type,
                        date: new Date()
                    }
                }
            }, { new: true })
            console.log(res);
            if (!res)
                return null
            return res.transactions[res.transactions.length - 1].transactionId
        } catch (error) {
            console.log(error);
            throw error
        }
    },
}