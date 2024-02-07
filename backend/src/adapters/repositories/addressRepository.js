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
    },
    updateAddress: async (data, id) => {
        try {
            const res = await AddressModal.updateOne({ _id: id }, data)
            if (res.matchedCount === 0)
                return false
            else
                return true

        } catch (error) {
            console.log(error);
            throw error
        }
    }
}