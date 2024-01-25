
const OtpModel=require('../models/otpModel')
module.exports={
    saveOtp:async(data)=>{
        try {
            const Otp = new OtpModel(data)
            console.log(Otp);
            await Otp.save()
            
            console.log("new user inserted");
            
        } catch (error) {
            console.log("user insertion failed" + error);
        }
    },
    findOtp:async(userId)=>{
        const doc=await OtpModel.findOne({userId:userId})
        if(doc){
            return doc.otp
        }else{
            return null
        }
    }
}