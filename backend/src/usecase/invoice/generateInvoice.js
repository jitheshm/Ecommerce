module.exports = async (invoiceRepository, invoiceId, userId,orderId) => {
    const data = {
        invoiceId: invoiceId,
        userId: userId,
        orderId: orderId,
        date: new Date()
    }
    return await invoiceRepository.generateInvoice(data)
}