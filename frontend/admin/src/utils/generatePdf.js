import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (orders) => {
    const pageWidth = 410; // in mm (approximately 11.7 inches)
    const pageHeight = 210; // in mm (approximately 8.27 inches)
    const maxTableHeight = 170; // Maximum height of the table on a single page


    // Create a new jsPDF instance with custom page size
    const doc = new jsPDF({
        orientation: 'landscape', // Set landscape orientation
        unit: 'mm', // Set unit of measurement to millimeters
        format: [pageWidth, pageHeight], // Set custom page size
    });

    doc.text('Sales Report', 10, 10); // Title

    let yPos = 20; // Initial Y position for content


    const headers = ['No', 'Date', 'OrderId', 'Delivery Address', 'Products', 'Sale Price', 'Quantity', 'Amount', 'Discount', 'Total']; // Add more headers as needed

    // Initialize data array for the table
    const data = [];

    // Add table data
    orders.forEach((order, index) => {
        const rowData = [
            index + 1,
            new Date(order.orderDate).toDateString(),
            order._id,
            `${order.deliveryAddress.name} , ${order.deliveryAddress.street},${order.deliveryAddress.city},${order.deliveryAddress.state},${order.deliveryAddress.pincode}`,
            order.productDetails.productName,
            order.orderedItems.salePrice,
            order.orderedItems.quantity,
            order.orderedItems.salePrice * order.orderedItems.quantity,
            order.orderedItems.discount,
            order.orderedItems.totalprice

        ];
        data.push(rowData);
    });

    // Add the table to the document
    doc.autoTable({
        startY: yPos,
        head: [headers],
        body: data,
        columnStyles: {
            0: { cellWidth: 15 },
            1: { cellWidth: 40 },
            2: { cellWidth: 40 },
            3: { cellWidth: 40 },
            4: { cellWidth: 40 },
            5: { cellWidth: 50 },
            6: { cellWidth: 40 },
            7: { cellWidth: 40 },
            8: { cellWidth: 40 },
            9: { cellWidth: 40 },
            10: { cellWidth: 40 }
        },
        styles: {
            cellPadding: 1,
            fontSize: 10,
            valign: 'middle', // Vertical alignment
            halign: 'center'  // Horizontal alignment
        },
        margin: { top: 20, bottom: 10 }, // Add margin to avoid content getting too close to page edges
        didDrawPage: function (data) {
            // Check if there's enough space for another table on the current page
            if (yPos + data.table.height >= maxTableHeight) {
                // Add a new page
                doc.addPage();
                // Reset Y position for the new page
                yPos = 10;
            }
        }
    });

    // Save the PDF
    doc.save('sales_report.pdf');
};

export default generatePDF;
