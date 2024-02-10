const express = require("express");
const router = express.Router();
const { TicketController } = require("../../controllers/index");

router.post("/tickets", TicketController.create);

module.exports = router;