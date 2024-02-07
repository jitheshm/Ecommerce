const addAddress = require("../../usecase/address/addAddress");
const addressRepository = require("../repositories/addressRepository");

module.exports = {
    addAddress: async (data, userId) => {
        data.userId = userId
        console.log(userId);
        return await addAddress(data, addressRepository)
    },

}