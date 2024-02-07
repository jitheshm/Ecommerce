const Address = require("../../entity/addressEntity")

module.exports = async (data, addressRepository) => {
    const resultData = new Address(data)
    return await addressRepository.addAddress(resultData)
}
