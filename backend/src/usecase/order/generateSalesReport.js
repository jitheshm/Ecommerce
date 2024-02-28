module.exports = async (startDate, endDate, orderRepository) => {
    return await orderRepository.generateSalesReport(startDate, endDate)
}