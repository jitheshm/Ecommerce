module.exports=async(user1,user2,chatRepository)=>{
return await chatRepository.fetchMessage(user1,user2)
}