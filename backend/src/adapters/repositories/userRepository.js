const User = require('../../entity/userEntity');
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
    fetchUsers: async (page, limit) => {
        try {
            const users = await UserModel.find({}).skip((page - 1) * limit).limit(limit)
            const totalUsers = await UserModel.countDocuments()
            const totalPages = Math.ceil(totalUsers / limit)
            return { users, totalPages }
        } catch (error) {
            throw error
        }

    },
    findUser: async (id) => {
        try {
            const user = await UserModel.findOne({ _id: id })
            return user
        } catch (error) {
            throw error
        }
    },
    isBlocked: async (id) => {
        try {
            const user = await UserModel.findOne({ _id: id })
            return user.isBlocked
        } catch (error) {
            throw error
        }
    },
    updatePersonalData: async (userId, data) => {
        try {
            const userData = new User(data)
            console.log("haiii");
            console.log(userData);
            const { dateOfJoin, isVerified, isBlocked, ...newData } = userData
            const status = await UserModel.updateOne({ _id: userId }, newData)
            if (status.modifiedCount != 1) {
                return false
            } else {
                return true
            }
        } catch (error) {
            throw error
        }
    },
    getPersonalData: async (userId) => {
        try {
            return UserModel.findOne({ _id: userId }, { password: 0 })

        } catch (error) {
            throw error
        }
    }
}
