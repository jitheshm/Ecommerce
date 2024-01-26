const fetchUsers = async (userRepository) => {
    const users = await userRepository.fetchUsers()
    return users
}

module.exports = fetchUsers