const authAdmin = require("../../usecase/admin/authAdmin")
const blockUser = require("../../usecase/admin/blockUser")
const fetchUsers = require("../../usecase/admin/fetchUsers")
const unblockUser = require("../../usecase/admin/unblock")
const adminRepository = require("../repositories/adminRepository")
const userRepository = require("../repositories/userRepository")
const authService = require("../services/authService")
const passwordService = require('../services/password')
module.exports={
    login:async(data)=>{
        const token= await authAdmin(data,adminRepository,passwordService,authService)
        return token
    },
    blockUser:async(userId)=>{
        const status= await blockUser(userId,userRepository)
        return status
    },
    unblockUser:async(userId)=>{
        const status= await unblockUser(userId,userRepository)
        return status
    },
    fetchAllUsers:async()=>{
        const users=await fetchUsers(userRepository)
        return users
    }
}