const Token=require('../../entity/tokenEntity')
const authAdmin=async(data,adminRepository,passwordService,authService)=>{
    const existUser=await adminRepository.findAdmin(data)
    if(existUser){
        const result=await passwordService.verifyPassword(data.password,existUser.password)
        if(result){
            const tokenData=new Token(existUser,"admin")
            console.log(tokenData);
            const token=await authService.createToken(tokenData)
            console.log(token);

            return token
        }
    }
    return null
}

module.exports=authAdmin