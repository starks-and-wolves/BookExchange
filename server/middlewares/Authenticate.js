const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const JWTKEY = "iamhritish";
const cookieparser = require("cookie-parser");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, JWTKEY);
    const rootUser = await userModel.find({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);
    if (!rootUser) {
      throw new Error("Úser not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    // console.log(req.rootUser);
    next();
  } catch (error) {
    res.status(401).send("Unauthorized No token provided");
    console.log(error);
    console.log("Unauthorized No token provided");
  }
};

module.exports = Authenticate;
