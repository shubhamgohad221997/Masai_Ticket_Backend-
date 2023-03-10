

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");


const protect = asyncHandler(async (req, res, next) => {


  if (req.headers.authorization) {

    try {
      let token = req.headers.authorization.split(" ")[1];
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
      req.user = await User.findById(decoded.id).select("-passoword");
    
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
    
  } else {
    return res.status(404).json({ message: "User Token Missing" });
  }
});

module.exports = { protect };
