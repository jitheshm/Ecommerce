const fetchUsers = async (userRepository,page, limit) => {
    const users = await userRepository.fetchUsers(page, limit)
    return users
}

module.exports = fetchUsers