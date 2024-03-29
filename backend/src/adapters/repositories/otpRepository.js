
const OtpModel = require('../models/otpModel')
module.exports = {
    saveOtp: async (data) => {
        try {
            // const Otp = new OtpModel(data)
            // console.log(Otp);
            // await Otp.save()
            await OtpModel.findOneAndUpdate({userId:data.userId},data,{
                upsert:true
            })

            console.log("new otp inserted");
            return true

        } catch (error) {
            console.log("otp insertion failed" + error);
            throw error
        }
    },
    findOtp: async (userId) => {
        try {
            const doc = await OtpModel.findOne({ userId: userId })
            if (doc) {
                return doc.otp
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }
}