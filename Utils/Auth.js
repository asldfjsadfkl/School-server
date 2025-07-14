const USER = require("../Models/User.js");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const { auth_token } = await req.cookies;
    if (auth_token) {
      const decoded = jwt.verify(auth_token, "jamia");
      req.user = await USER.findById(decoded.id);
      next();
    } else {
      res.status(401).json({
        message: "inValid token for jwt",
      });
    }
  } catch (error) {
    console.log(error)
  }

};

module.exports = isAuth;
