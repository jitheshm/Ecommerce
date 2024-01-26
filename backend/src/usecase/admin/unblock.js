const unblockUser = async(userId, userRepository) => {
    const status = await userRepository.unblockUser(userId)
    return status
}

module.exports = unblockUser