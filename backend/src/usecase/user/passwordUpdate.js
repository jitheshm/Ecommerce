module.exports = async (userId, password, passwordService, userRepository) => {
    const hash = await passwordService.hashPassword(password)
    console.log(hash);
    const data = {
        password: hash
    }
    return await userRepository.updatePersonalData(userId, data)
}