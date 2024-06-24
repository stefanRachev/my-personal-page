const router = require("express").Router();
const Comment = require("../models/Comment");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { user: userId, text, imageUrl } = req.body;

  try {
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const comment = new Comment({
      user: userId,
      text,
      imageUrl,
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

module.exports = router;
