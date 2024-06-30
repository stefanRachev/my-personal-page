const router = require('express').Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/validate-token', authMiddleware, (req, res) => {
  console.log("User data in validate-token route:", req.user);
  res.status(200).json({ isValid: true, user: req.user });
  
});

module.exports = router;
