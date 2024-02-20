module.exports = async (walletRepository, userId) => {
    return await walletRepository.findWallet(userId)
}