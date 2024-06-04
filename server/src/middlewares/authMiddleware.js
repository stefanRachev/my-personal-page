const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, "SOME_SECRET");
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: "You are not authorized!" });
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/users/login");
  }
  next();
};
