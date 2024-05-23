const router = require("express").Router();
const userService = require("../services/userService");

router.post("/register", async (req, res) => {
  try {
    const { email, password, nickName } = req.body;
    
    await userService.register({ email, password, nickName });
    res.send({ message: "Registered successfully" });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post("/login",async(req,res)=>{
  try {
    const { email, password, } = req.body;
    
    await userService.login({ email, password});
    res.send({ message: "LoggedIn successfully" });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
})

module.exports = router;
