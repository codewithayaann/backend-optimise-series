// reportUtils.js

/**
 * Generates a sales report based on some sample data.
 * 
 * @returns {string} A string representing the sales report.
 */
function generateSalesReport() {
  const salesData = [
    { product: 'Product A', sales: 100 },
    { product: 'Product B', sales: 200 },
    { product: 'Product C', sales: 300 },
  ];

  const report = salesData.map((data) => `${data.product}: ${data.sales}`).join('\n');

  return report;
}

/**
 * Simulates sending an email with the sales report.
 * 
 * @param {string} report The sales report to be sent.
 */
function sendEmail(email, title, report) {
  console.log(`EMAIL: ${email}, ${title}, Report: ${JSON.stringify(report, null, 2)}`);
}

module.exports = { generateSalesReport, sendEmail };