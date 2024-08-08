const { generateSalesReport, sendEmail } = require('./reportUtils');


const sendReport = async () => {
    console.log('-----Generating daily sales report...------');
    const report = await generateSalesReport();
    console.log('Sending....');
    await sendEmail('admin@example.com', 'Daily Sales Report', report);
    console.log('----Report sent successfully.------');
}

module.exports = { sendReport };