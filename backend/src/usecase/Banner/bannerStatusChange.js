module.exports = async (id, status,bannerRepository) => {
    return await bannerRepository.statusChange(id,status)
}