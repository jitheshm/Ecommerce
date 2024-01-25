const UserModel = require('../models/userModel')
module.exports = {
    create: async (data) => {
        try {
            const user = new UserModel(data)
            console.log(user);
            await user.save()

            console.log("new user inserted");
            return user._id
        } catch (error) {
            console.log("user insertion failed" + error);
            throw error
        }
    },
    checkUser: async (data) => {
        try {
            const existUser = await UserModel.findOne({ email: data.email })
            return existUser
        } catch (error) {
            //console.log(error.message);
            console.log(error);
            throw error


        }
    },
    verifyUser: async (userId) => {
        try {
            console.log(userId);
            await UserModel.updateOne({ _id: userId }, { isVerified: true })
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
}
