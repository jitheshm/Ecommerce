const addUser = require("../../usecase/user/addUser")
const sendOtp = require('../../usecase/otp/sendOtp')
const userRepository = require("../repositories/userRepository")
const passwordService = require('../services/password')
const otpService = require("../services/otpService")
const otpRepository = require("../repositories/otpRepository")
const verifyOtp = require("../../usecase/otp/verifyOtp")
const verifyUser = require("../../usecase/user/verifyUser")
module.exports = {
    signup: async (data, nodemailerEmail, nodemailerPassword) => {

        //console.log(data);
        const userId = await addUser(userRepository, passwordService, data)
        if (userId) {
            console.log("haii");
            const otpOptions = {
                otpRepository,
                otpService,
                email: data.email,
                userId,
                nodemailerEmail,
                nodemailerPassword
            }
            const status = await sendOtp(otpOptions)
            return status
        } else {
            return false
        }

    },
    verifyUser: async (data, userId) => {
        const status = await verifyOtp(data.otp, userId, otpRepository, otpService)
        if (status) {
            await verifyUser(userId, userRepository)
        }
        return status

    }
}