const authAdmin = require("../../usecase/admin/authAdmin")
const adminRepository = require("../repositories/adminRepository")
const authService = require("../services/authService")
const passwordService = require('../services/password')
module.exports={
    login:async(data)=>{
        const token= await authAdmin(data,adminRepository,passwordService,authService)
        return token
    }
}