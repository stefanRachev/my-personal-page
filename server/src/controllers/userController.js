const router = require("express").Router();

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

module.exports = router;
