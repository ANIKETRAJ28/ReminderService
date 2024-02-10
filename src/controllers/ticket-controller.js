const { TicketService } = require("../services/index");

const ticketService = new TicketService();

const create = async (req, res) => {
    try {
        const response = await ticketService.createNotification(req.body);
        return res.status(201).json({
            data: response,
            message: "Successfully registered an email reminder",
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: "Failed to register an email reminder",
            success: false,
            err: error
        });
    }
}

module.exports = {
    create
}