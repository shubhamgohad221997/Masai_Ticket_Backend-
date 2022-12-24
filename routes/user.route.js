

const express = require("express");
const {
  registerUser,
  authUser,
  createTicket,
  getTickets,
  bookmarkTickets,
} = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth.middlware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/createTicket").post(protect, createTicket);
router.route("/getTickets").get(protect, getTickets);
router.route("/bookmarks").post(protect, bookmarkTickets);

module.exports = router;
