const findWallet = require("../../usecase/wallet/findWallet")
const walletRepository = require("../repositories/walletRepository")

module.exports = {
    getWallet: async (userId) => {
        return await findWallet(walletRepository, userId)
    }
}