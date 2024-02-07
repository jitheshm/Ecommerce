module.exports = async(addressRepository, userId) => {
    return await addressRepository.getUserAllAddress(userId)
}