const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const TicketService = require("./services/ticket-service");
const job = require("./utils/job");
const apiRoutes = require("./routes/index");
const { EMAIL_ID, EMAIL_PASS } = require("./config/serverConfig");

const ticketService = new TicketService();

const setupAndStartServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    job();

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);

        // ticketService.sendBasicEmail(
        //     "aniketraj28042003@gmail.com",
        //     "aniketraj28042003@gmail.com",
        //     "This is testing email",
        //     "Hey, how are you, I hope you like the support"
        // )
    });

}

setupAndStartServer();