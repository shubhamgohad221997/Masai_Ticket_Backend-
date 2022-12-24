
const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket.model");


const createTicket = asyncHandler(async (req, res) => {

  let newTicketItem = req.body;
  const { _id: userId } = req.user;
  

  const isUserinTicket = await Ticket.findOne({ user: userId });
  if (!isUserinTicket) {
    const ticket = new Ticket({ user: userId, ticketItems: newTicketItem });
    const createdCart = await ticket.save();
    res.json({ message: "Product added to cart", product: createdCart });
  } else {
    let updated = await Ticket.findOneAndUpdate(
      { user: userId },
      { $push: { ticketItems: newTicketItem } }
    );
    res.json({ message: "Product added to cart", data: updated });
  }
});

module.exports = { createTicket };
