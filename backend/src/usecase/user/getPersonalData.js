module.exports = async (userRepository, userId) => {
    return await userRepository.getPersonalData(userId)
}