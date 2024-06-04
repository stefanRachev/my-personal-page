const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/about-me", isAuth, (req, res) => {
  res.send("You are authenticated and can access About Me page.");
});

module.exports = router;
