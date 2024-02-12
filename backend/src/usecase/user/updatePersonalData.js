module.exports = async (userRepository, userId, data) => {
    return await userRepository.updatePersonalData(userId, data)
}