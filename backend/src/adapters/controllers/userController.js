const addUser = require("../../usecase/user/addUser")
const sendOtp=require('../../usecase/otp/sendOtp')
const userRepository = require("../repositories/userRepository")
const passwordService=require('../services/password')
const otpService = require("../services/otpService")
const otpRepository = require("../repositories/otpRepository")
module.exports = {
    signup: async (data,nodemailerEmail,nodemailerPassword) => {
        try {
            //console.log(data);
           const userId=await addUser(userRepository,passwordService, data)
           console.log("haii");
           const otpOptions={
            otpRepository,
            otpService,
            email:data.email,
            userId,
            nodemailerEmail,
            nodemailerPassword
           }
            await sendOtp(otpOptions)
        } catch (error) {
            throw error
        }
    }
}