

const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");


const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      tickets: user.tickets,
      bookmarks: user.bookmarks,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log("in auth user");
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      tickets: user.tickets,
      bookmarks: user.bookmarks,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(401).json({ message: "User Not Fouund" });
  }
});

const createTicket = asyncHandler(async (req, res) => {
  let newTicketItem = req.body;
  const { _id: userId } = req.user;

  let updated = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { tickets: newTicketItem } }
  );
  res.json({ message: "Product added to cart", data: updated });
});

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user._id)
  if (user) {
    return res.status(200).json({
      tickets: user.tickets,
      bookmarks: user.bookmarks,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    return res.status(401).json({ message: "User Not Fouund" });
  }

});

const bookmarkTickets = asyncHandler(async (req, res) => {
  let newBookMarkItem = req.body;
  const { _id: userId } = req.user;

  let updated = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { bookmarks: newBookMarkItem } }
  );
  res.json({ message: "Product added to cart", data: updated });
});

module.exports = {
  registerUser,
  authUser,
  getProfile,
  createTicket,
  getTickets,
  bookmarkTickets,
};
