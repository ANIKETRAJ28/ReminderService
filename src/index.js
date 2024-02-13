const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
// const TicketService = require("./services/ticket-service");
// const job = require("./utils/job");
const { createChannel, subscribeMessage } = require("./utils/messageQueues");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
const { TicketService } = require("./services/index");
const apiRoutes = require("./routes/index");

const ticketService = new TicketService();

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();
    subscribeMessage(channel, ticketService.subscribeEvents, REMINDER_BINDING_KEY);

    // job();

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });

}

setupAndStartServer();