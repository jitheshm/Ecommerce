module.exports = async (adminRepository, data) => {
    return await adminRepository.findAdmin(data)
}