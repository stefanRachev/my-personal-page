// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   const token = req.cookies.authToken;
//   console.log(token);

//   if (token) {
//     try {
//       const decodedToken = jwt.verify(token, "SOME_SECRET");
//       req.user = decodedToken;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "You are not authorized!" });
//     }
//   } else {
//     next();
//     console.log("some fall");
//   }
// };

// exports.isAuth = (req, res, next) => {
//   if (!req.user) {
//     console.log(req.user);
//     return res.redirect("/users/login");
//   }
//   next();
// };

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log('Token in middleware:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ isValid: false, message: 'No token provided' });
  }

  jwt.verify(token, 'SOME_SECRET', (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(401).json({ isValid: false, message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    console.log('Decoded user data:', decoded);
    next();
  });
};

module.exports = authMiddleware;

