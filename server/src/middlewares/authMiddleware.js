const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ isValid: false, message: "No token provided" });
  }

  jwt.verify(token, "SOME_SECRET", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ isValid: false, message: "Failed to authenticate token" });
    }

    req.user = decoded;

    next();
  });
};

module.exports = authMiddleware;
