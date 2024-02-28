import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (orders) => {
    const pageWidth = 297; // in mm (approximately 11.7 inches)
    const pageHeight = 210; // in mm (approximately 8.27 inches)

    // Create a new jsPDF instance with custom page size
    const doc = new jsPDF({
        orientation: 'landscape', // Set landscape orientation
        unit: 'mm', // Set unit of measurement to millimeters
        format: [pageWidth, pageHeight], // Set custom page size
    });

    doc.text('Sales Report', 10, 10); // Title

    let yPos = 20; // Initial Y position for content

    
    const headers = ['No', 'Date', 'Products', 'Offer Discount', 'Coupon Discount', 'Total Discount', 'Revenue']; // Add more headers as needed

    // Initialize data array for the table
    const data = [];

    // Add table data
    orders.forEach((order, index) => {
        const rowData = [
            index + 1,
            new Date(order._id).toDateString(),
            order.ProductsCount,
            order.discount,
            order.couponDiscount,
            order.couponDiscount + order.discount,
            order.revenue
           
        ];
        data.push(rowData);
    });

    // Add the table to the document
    doc.autoTable({
        startY: yPos,
        head: [headers],
        body: data,
        columnStyles: {
            0: { cellWidth: 15 }, // No
            1: { cellWidth: 40 }, // Date
            2: { cellWidth: 40 }, // Products
            3: { cellWidth: 40 }, // Offer Discount
            4: { cellWidth: 40 }, // Coupon Discount
            5: { cellWidth: 50 }, // Total Discount
            6: { cellWidth: 40 }  // Revenue }
        },
        styles: {
            cellPadding: 1,
            fontSize: 10,
            valign: 'middle', // Vertical alignment
            halign: 'center'  // Horizontal alignment
        }
    });

    // Save the PDF
    doc.save('sales_report.pdf');
};

export default generatePDF;
