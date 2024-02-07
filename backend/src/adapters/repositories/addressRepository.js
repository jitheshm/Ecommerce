const AddressModal = require('../models/addressModel');
module.exports = {
    addAddress: async (data) => {
        try {
            await new AddressModal(data).save()
            return true
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}