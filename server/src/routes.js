const router = require("express").Router();
const userController = require("./controllers/userController");
const commentController = require("./controllers/commentController");
const authController = require("./controllers/authControllers");
const emailController = require("./controllers/emailController");

router.use("/users", userController);
router.use("/comments", commentController);
router.use("/auth", authController);
router.use("email", emailController);

router.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = router;
