module.exports = async (startDate, endDate, orderRepository,page, limit) => {
    return await orderRepository.generateSalesReport(startDate, endDate,page, limit)
}