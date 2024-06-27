const router = require("express").Router();
const userController = require("./controllers/userController");
const commentController = require("./controllers/commentController");


router.use("/users", userController);
router.use("/comments", commentController);


router.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = router;
