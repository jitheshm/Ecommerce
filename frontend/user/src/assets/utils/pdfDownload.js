import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const pdfDownload = () => {
    var contentWidth = document.getElementById("invoice_wrapper").clientWidth;
    var contentHeight = document.getElementById("invoice_wrapper").clientHeight;
    var topLeftMargin = 20;
    var pdfWidth = contentWidth + (topLeftMargin * 2);
    var pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);
    var canvasImageWidth = contentWidth;
    var canvasImageHeight = contentHeight;
    var totalPDFPages = Math.ceil(contentHeight / pdfHeight) - 1;
    const input = document.getElementById("invoice_wrapper");
    html2canvas(input, { scale: 2 }).then(function (canvas) { // Adjust scale as needed
        var imgData = canvas.toDataURL("image/png"); // Change to PNG format
        var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'PNG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(pdfWidth, pdfHeight);
            pdf.addImage(imgData, 'PNG', topLeftMargin, -(pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
        }
        pdf.save("sample-invoice.pdf");
    });
}

export default pdfDownload;
