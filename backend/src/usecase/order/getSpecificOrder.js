

module.exports=async(orderRepository,orderId,productId)=>{
    return await orderRepository.getSpecificOrder(orderId,productId)
}