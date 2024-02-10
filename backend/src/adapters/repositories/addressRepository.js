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
    },
    deleteAddress: async (id) => {
        try {
            const res = await AddressModal.deleteOne({ _id: id })
            console.log(res);
            if (res.deletedCount === 0)
                return false
            else
                return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getUserAllAddress: async (userId) => {
        try {
            const res = await AddressModal.find({ userId: userId })
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    findAddress: async (id) => {
        try {
            console.log(id);
            const res = await AddressModal.findOne({ _id: id })
            console.log("res"+res);
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}