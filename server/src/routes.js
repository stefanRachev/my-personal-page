const router = require("express").Router();

const userController = require("./controllers/userController");
//const aboutController = require("./controllers/aboutController");

router.use("/users", userController);

//router.use("/about", aboutController);

// router.get("*", (req, res) => {
//   res.redirect("/");
// });
router.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = router;
