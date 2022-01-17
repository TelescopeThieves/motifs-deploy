const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  
  const token = req.headers.authentication || req.query.authentication || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
      req.user = await User.findOne({_id: decoded.userId})

  } catch (err) {

      return res.status(401).send("Invalid Token");
  }

  return next()
};

module.exports = verifyToken;


