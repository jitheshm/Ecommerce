
const Otp = require('../../entity/otpEntity')
const sendOtp = async ({otpRepository, otpService, email, userId,...mailerConfig}) => {
    try {
        const generateOtp = otpService.createOtp()

        const otp = new Otp(generateOtp, userId)
        console.log(otp);
        await otpRepository.saveOtp(otp)
        otpService.sendOtp(generateOtp, email,mailerConfig)

    } catch (error) {
        console.log(error);
    }


}

module.exports = sendOtp