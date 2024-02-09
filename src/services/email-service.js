const sender = require("../config/emailConfig");

const sendBasicEmail = (mailTo, mainSubject, mailBody) => {
    sender.sendMail({
        to: mailTo,
        subject: mainSubject,
        text: mailBody
    });
}

module.exports = {
    sendBasicEmail
}