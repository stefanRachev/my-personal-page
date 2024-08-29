const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post("/validate-token", isAuthenticated, (req, res) => {
  res.status(200).json({ isValid: true, user: req.user });
});

module.exports = router;
