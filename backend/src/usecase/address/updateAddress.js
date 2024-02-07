const Address = require("../../entity/addressEntity")

module.exports=async(addressRepository,data)=>{
    const addressData=new Address(data)
    return await addressRepository.updateAddress(addressData,data.id)

}