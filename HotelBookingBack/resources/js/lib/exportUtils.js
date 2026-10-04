import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Export data as PDF
 * @param {string} title - Report title
 * @param {string[]} columns - Column headers
 * @param {any[][]} rows - Data rows
 * @param {string} filename - File name without extension
 * @param {object} options - Extra options (landscape, subtitle)
 */
export function exportPDF(title, columns, rows, filename = "report", options = {}) {
    const doc = new jsPDF({
        orientation: options.landscape ? "landscape" : "portrait",
    });

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(title, 14, 22);

    // Subtitle
    if (options.subtitle) {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(options.subtitle, 14, 30);
    }

    // Date
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, options.subtitle ? 36 : 30);

    // Table
    autoTable(doc, {
        head: [columns],
        body: rows,
        startY: options.subtitle ? 42 : 36,
        styles: {
            fontSize: 9,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [99, 102, 241],
            textColor: 255,
            fontStyle: "bold",
        },
        alternateRowStyles: {
            fillColor: [245, 245, 250],
        },
    });

    doc.save(`${filename}.pdf`);
}

/**
 * Export data as Excel
 * @param {string} title - Sheet name
 * @param {string[]} columns - Column headers
 * @param {any[][]} rows - Data rows
 * @param {string} filename - File name without extension
 */
export function exportExcel(title, columns, rows, filename = "report") {
    const data = [columns, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Auto-width columns
    const colWidths = columns.map((col, i) => {
        const maxLen = Math.max(
            col.length,
            ...rows.map((row) => String(row[i] ?? "").length)
        );
        return { wch: Math.min(maxLen + 2, 40) };
    });
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title.substring(0, 31));
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), `${filename}.xlsx`);
}
