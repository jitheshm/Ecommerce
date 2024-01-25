
const Otp = require('../../entity/otpEntity')
const sendOtp = async ({ otpRepository, otpService, email, userId, ...mailerConfig }) => {
    
        const generateOtp = otpService.createOtp()

        const otp = new Otp(generateOtp, userId)
        console.log(otp);
        const status = await otpRepository.saveOtp(otp)
        if (status) {
            otpService.sendOtp(generateOtp, email, mailerConfig)
        }
        return status


   


}

module.exports = sendOtp