const Token=require('../../entity/tokenEntity')
const authUser=async(data,userRepository,passwordService,authService)=>{
    const existUser=await userRepository.checkUser(data)
    if(existUser && existUser.isVerified){
        const result=await passwordService.verifyPassword(data.password,existUser.password)
        if(result){
            const tokenData=new Token(existUser,"user")
            console.log(tokenData);
            const token=await authService.createToken(tokenData)
            console.log(token);

            return token
        }
    }
    return null
}

module.exports=authUser