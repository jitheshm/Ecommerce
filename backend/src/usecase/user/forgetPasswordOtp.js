module.exports = async (userRepository, otpRepository, otpService, authService, sendOtp, data, nodemailerEmail,
    nodemailerPassword) => {
    const user = await userRepository.checkUser(data)
    if (user && user.isVerified) {
        const tokenData = {
            id: user._id,
            isVerified: false,
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
}