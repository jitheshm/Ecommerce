const addAddress = require("../../usecase/address/addAddress");
const deleteAddress = require("../../usecase/address/deleteAddress");
const updateAddress = require("../../usecase/address/updateAddress");
const addressRepository = require("../repositories/addressRepository");

module.exports = {
    addAddress: async (data, userId) => {
        data.userId = userId
        console.log(userId);
        return await addAddress(data, addressRepository)
    },
    updateAddress: async (data, id) => {
        const status = await updateAddress(addressRepository, data)
        return status
    },
    deleteAddress:async(id)=>{
        const status=await deleteAddress(addressRepository,id)
        return status
    }

}