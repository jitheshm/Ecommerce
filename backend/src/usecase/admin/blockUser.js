const blockUser = async(userId, userRepository) => {
    const status = await userRepository.blockUser(userId)
    return status
}

module.exports = blockUser