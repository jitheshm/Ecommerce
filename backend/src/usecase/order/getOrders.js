module.exports=async(orderRepository,userId)=>{
    return await orderRepository.getOrders(userId)
}