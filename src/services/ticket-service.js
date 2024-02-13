const sender = require("../config/emailConfig");
const { TicketRepository } = require("../repository/index");

const ticketRepository = new TicketRepository();

class TicketService {
    
    sendBasicEmail = async (mailTo, mailSubject, mailBody) => {
        try {
            const response = await sender.sendMail({
                to: mailTo,
                subject: mailSubject,
                text: mailBody
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    fetchPendingEmails = async (timestamp) => {
        try {
            const ticket = await ticketRepository.get({status: "PENDING"});
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }
    
    createNotification = async (data) =>  {
        try {
            const notification = await ticketRepository.create(data);
            return notification;
        } catch (error) {
            console.log(error);
        }
    }

    updatePendingEmails = async (id, data) => {
        try {
            const response = await ticketRepository.update(id, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    subscribeEvents = async (payload) => {
        let service = payload.service;
        switch(service) {
            case "CREATE_TICKET":
                this.createNotification(payload.data);
                break;
            case "SEND_TICKET":
                this.sendBasicEmail(payload.data);
                break;
            default:
                console.log("No valid event recieved");
                break;
        }
    }

}

module.exports = TicketService;