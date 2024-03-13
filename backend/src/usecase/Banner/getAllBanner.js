module.exports = (bannerRepository,page, limit) => {
    return bannerRepository.getAllBanners(page, limit)
}