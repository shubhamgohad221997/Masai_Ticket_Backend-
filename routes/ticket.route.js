

const express = require("express");
const { createTicket } = require("../controllers/ticket.controller");
const { protect } = require("../middlewares/auth.middlware");

const router = express.Router();

router.route("/").post(protect, createTicket);

module.exports = router;
