const Banner = require("../../entity/bannerEntity")

const updateBanner=async(data,bannerRepository)=>{
    const bannerData = new Banner(data)
    return await bannerRepository.bannerUpdate(bannerData,data.id)
}

module.exports=updateBanner