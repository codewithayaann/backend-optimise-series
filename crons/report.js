const cron = require('node-cron');

const { sendReport } = require('../utils/helper.js');

// Schedule to run on every 1 minutes;
cron.schedule('0 17 * * *', async () => {
    try {
        sendReport()
    } catch (error) {
        console.error('Error generating or sending report:', error);
    }
});
