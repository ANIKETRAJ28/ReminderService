const cron = require('node-cron');
const sender = require("../config/emailConfig");
const { TicketService } = require("../services/index");

const ticketService = new TicketService();

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await ticketService.fetchPendingEmails();
        response.forEach((emails) => {
            sender.sendMail({
                to: emails.recepientEmail,
                subject: emails.subject,
                text: emails.content
            }, async (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await ticketService.updatePendingEmails(emails.id, {status: "SUCCESS"});
                }
            });
        });
        console.log(response);
    });
}

module.exports = setupJobs;