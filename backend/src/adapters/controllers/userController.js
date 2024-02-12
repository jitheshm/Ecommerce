const addUser = require("../../usecase/user/addUser")
const sendOtp = require('../../usecase/otp/sendOtp')
const userRepository = require("../repositories/userRepository")
const passwordService = require('../services/password')
const otpService = require("../services/otpService")
const otpRepository = require("../repositories/otpRepository")
const verifyOtp = require("../../usecase/otp/verifyOtp")
const verifyUser = require("../../usecase/user/verifyUser")
const authService = require("../services/authService")
const authUser = require("../../usecase/user/authUser")
const findUser = require("../../usecase/user/findUser")
const updatePersonalData = require("../../usecase/user/updatePersonalData")
const getPersonalData = require("../../usecase/user/getPersonalData")
module.exports = {
    signup: async (data, nodemailerEmail, nodemailerPassword) => {

        //console.log(data);
        const user = await addUser(userRepository, passwordService, data)
        if (user) {
            const tokenData = {
                id: user._id,
                name: user.firstName,
                isVerified: user.isVerified,
                role: "user"
            }

            const token = await authService.createToken(tokenData)

            console.log(token);
            const otpOptions = {
                otpRepository,
                otpService,
                email: data.email,
                userId: user._id,
                nodemailerEmail,
                nodemailerPassword
            }

            await sendOtp(otpOptions)

            return token


        } else {
            return null
        }

    },
    verifyUser: async (data, token) => {
        const userData = await authService.verifyToken(token)
        const userId = userData.id
        console.log(userData);
        const status = await verifyOtp(data.otp, userId, otpRepository, otpService)
        console.log("otp" + status);
        if (status) {
            const verifyStatus = await verifyUser(userId, userRepository)
            if (verifyStatus) {
                const tokenData = {
                    id: userData.id,
                    name: userData.name,
                    role: "user",
                    isVerified: true
                }
                const token = await authService.createToken(tokenData)
                return { token, name: userData.name }
            }
            return null
        }
        return null

    },
    loginUser: async (data) => {
        const result = await authUser(data, userRepository, passwordService, authService)
        return result
    },
    resendOtp: async (tokenData, nodemailerEmail, nodemailerPassword) => {
        const { iat } = tokenData
        const currentTime = Math.floor(Date.now() / 1000);


        const result = currentTime - iat;

        console.log(result);

        if (result > 30) {
            //need to fetch user email here
            const user = await findUser(userRepository, tokenData.id)
            const otpOptions = {
                otpRepository,
                otpService,
                email: user.email,
                userId: user._id,
                nodemailerEmail,
                nodemailerPassword
            }

            await sendOtp(otpOptions)
            return true
        } else {
            return false
        }
    },
    changePersonaldata: async (userId, data) => {
        return await updatePersonalData(userRepository, userId, data)
    },
    getPersonalData: async (userId) => {
        return await getPersonalData(userRepository,userId)
    }

}