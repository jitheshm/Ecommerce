module.exports = async (orderRepository) => {
    return await orderRepository.topSellingProducts()
}