module.exports = async (orderId, invoiceRepository) => {
    
    return await invoiceRepository.getInvoice(orderId)
}