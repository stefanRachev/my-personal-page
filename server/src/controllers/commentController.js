const router = require("express").Router();
const Comment = require("../models/Comment");
const User = require("../models/User");

router.post("/comment", async (req, res) => {
  const { user: userId, text, imageUrl } = req.body;
  console.log("Received comment data:", req.body); // Add this log

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

    console.log("Comment saved successfully:", comment); // Add this log

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

router.get("/comments/:imageUrl", async (req, res) => {
  const { imageUrl } = req.params;

  try {
    const comments = await Comment.find({ imageUrl }).populate(
      "user",
      "nickName"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

module.exports = router;
