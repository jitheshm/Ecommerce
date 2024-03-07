module.exports = async (orderRepository) => {
    return await orderRepository.topSellingCategories()
}