const router = require("express").Router();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken || "";
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "SOME_SECRET");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/verify-token", verifyToken, (req, res) => {
  const user = req.user;
  res.json(user);
});

module.exports = router;
