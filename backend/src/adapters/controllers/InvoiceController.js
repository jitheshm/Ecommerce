const generateInvoice = require("../../usecase/invoice/generateInvoice");
const getInvoice = require("../../usecase/invoice/getInvoice");
const invoiceRepository = require("../repositories/invoiceRepository")
const short = require('short-uuid');



module.exports = {
    generateInvoice: async (orderId, userId) => {
        const invoiceId = short.generate()
        await generateInvoice(invoiceRepository, invoiceId, userId, orderId)
    },
    getInvoice: async (orderId) => {

        return await getInvoice(orderId, invoiceRepository)

    }
}