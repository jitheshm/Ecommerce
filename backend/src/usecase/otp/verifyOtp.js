const verifyOtp=async(otp,userId,otpRepository,otpService)=>{
    var generateOtp=await otpRepository.findOtp(userId)
    console.log(generateOtp);
    if(otp===generateOtp){
        return true
    }else{
        return false
    }
}

module.exports=verifyOtp