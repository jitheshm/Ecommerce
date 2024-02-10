

module.exports=async(orderRepository,orderId)=>{
    return await orderRepository.getSpecificOrder(orderId)
}