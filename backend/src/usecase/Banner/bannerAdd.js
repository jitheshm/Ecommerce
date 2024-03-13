const Banner = require("../../entity/bannerEntity")

module.exports = async (data, bannerRepository) => {
    const banner = new Banner(data)
    return await bannerRepository.bannerAdd(banner)
}