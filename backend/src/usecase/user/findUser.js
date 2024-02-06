const findUser = async(userRepository, id) => {
    const user = await userRepository.findUser(id)
    return user
}
module.exports = findUser