import Excel from 'exceljs';
import { saveAs } from 'file-saver';
export default (datas) => {
    const columns = [
        { header: 'No', key: 'no' },
        { header: 'Date', key: 'date' },
        { header: 'OrderId', key: 'orderId' },
        { header: 'Delivery Address', key: 'deliveryAddress' },
        { header: 'Products', key: 'products' },
        { header: 'Sale Price', key: 'saleprice' },
        { header: 'Quantity', key: 'quantity' },
        { header: 'Amount', key: 'amount' },
        { header: 'Discount', key: 'discount' },
        { header: 'Total', key: 'total' }
    ];

    const data = datas.map((order, index) => {
        return {
            no: index + 1,
            date: new Date(order.orderDate).toDateString(),
            orderId: order._id,
            deliveryAddress: `${order.deliveryAddress.name} , ${order.deliveryAddress.street},${order.deliveryAddress.city},${order.deliveryAddress.state},${order.deliveryAddress.pincode}`,
            products: order.productDetails.productName,
            saleprice: order.orderedItems.salePrice,
            quantity: order.orderedItems.quantity,
            amount: order.orderedItems.salePrice * order.orderedItems.quantity,
            discount: order.orderedItems.discount,
            total: order.orderedItems.totalprice

        }
    });

    const workSheetName = 'Worksheet-1';
    
    const workbook = new Excel.Workbook();
   
    const saveExcel = async () => {
        try {
            
            const fileName = "salesreport"

            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName,);

            // add worksheet columns
            // each columns contains header and its mapping key from data
            worksheet.columns = columns;

            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };

            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach(column => {
                column.width = column.header.length + 5;
                column.alignment = { horizontal: 'center' };
            });

            // loop through data and add each one to worksheet
            data.forEach(singleData => {
                worksheet.addRow(singleData);
            });

            // loop through all of the rows and set the outline style.
            worksheet.eachRow({ includeEmpty: false }, row => {
                // store each cell to currentCell
                const currentCell = row._cells;

                // loop through currentCell to apply border only for the non-empty cell of excel
                currentCell.forEach(singleCell => {
                    // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                    const cellAddress = singleCell._address;

                    // apply border
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });

            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${ fileName }.xlsx`);
        } catch (error) {
            console.error('<<<ERRROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // removing worksheet's instance to create new one
            workbook.removeWorksheet(workSheetName);
        }
    };
     saveExcel()
}