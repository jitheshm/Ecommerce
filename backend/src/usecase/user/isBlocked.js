module.exports = async (userRepository, id) => {
    return await userRepository.isBlocked(id)
}