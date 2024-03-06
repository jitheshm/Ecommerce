module.exports = async (orderRepository, filter) => {
    let startDate
    let endDate
    let dateFormat
    if (filter === "daily") {
        startDate = new Date()
        startDate.setDate(startDate.getDate() - 7)
        endDate = new Date()
        dateFormat = "%Y-%m-%d"
    }
    else if (filter === "weekly") {
        startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)
        endDate = new Date()
        dateFormat = "%Y-%U"
    }
    else if (filter === "monthly") {
        startDate = new Date()
        startDate.setFullYear(startDate.getFullYear() - 1)
        endDate = new Date()
        dateFormat = "%Y-%m"
    }
    else if (filter === "yearly") {
        startDate = new Date()
        startDate.setFullYear(startDate.getFullYear() - 5)
        endDate = new Date()
        dateFormat = "%Y"
    }

    const data = await orderRepository.salesOverview(startDate, endDate, dateFormat)
    console.log(data);
    return data
}