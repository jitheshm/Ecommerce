const verifyUser=async(userId,userRepository)=>{
    
    const status=await userRepository.verifyUser(userId)
    return status
}

module.exports=verifyUser