const UserModel = require('../models/userModel')
module.exports = {
    create: async (data) => {
        try {
            const user = new UserModel(data)
            console.log(user);
            await user.save()

            console.log("new user inserted");
            return user
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
            throw error
        }
    },
    blockUser: async (userId) => {
        try {
            console.log(userId);
            const result = await UserModel.updateOne({ _id: userId }, { isBlocked: true })
            console.log(result.matchedCount);
            if (result.matchedCount === 0)
                return false
            else
                return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    unblockUser: async (userId) => {
        try {
            console.log(userId);
            const result = await UserModel.updateOne({ _id: userId }, { isBlocked: false })
            console.log(result.matchedCount);
            if (result.matchedCount === 0)
                return false
            else
                return true
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    fetchUsers: async () => {
        try {
            const users = await UserModel.find({})
            return users
        } catch (error) {
            throw error
        }

    }
}
