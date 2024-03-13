const Banner = require("../../entity/bannerEntity")

const updateBanner=async(data,bannerRepository)=>{
    const bannerData = new Banner(data)
    console.log(bannerData);
    return await bannerRepository.bannerUpdate(bannerData,data.id)
}

module.exports=updateBanner