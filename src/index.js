const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
// const TicketService = require("./services/ticket-service");
// const job = require("./utils/job");
const { createChannel } = require("./utils/messageQueues");
const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // const channel = await createChannel();

    // job();

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });

}

setupAndStartServer();