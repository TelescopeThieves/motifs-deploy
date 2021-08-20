const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  
  const token = req.headers.authentication || req.query.authentication || req.headers["x-access-token"];

  // console.log(token, 'authjwt!', req.headers)

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
      req.user = await User.findOne({_id: decoded.userId})

  } catch (err) {

      return res.status(401).send("Invalid Token");
  }
  // jwt.verify(token, config.secret, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({ message: "Unauthorized!" });
  //   }
  //   req.userId = decoded.id;
  //   next();
  // });
  return next()
};

// const authJwt = {
//     verifyToken
// };
module.exports = verifyToken;


