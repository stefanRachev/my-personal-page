const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const Comment = require("../models/Comments");
const User = require("../models/User");

router.post("/comment", async (req, res) => {
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
      createdAt: new Date(),
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

router.get("/", async (req, res) => {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const comments = await Comment.find({ imageUrl }).populate(
      "user",
      "nickName"
    );

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error });
  }
});



router.put("/comment/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params; 
  const { text } = req.body; 

  try {
    const comment = await Comment.findById(id);

    console.log("Comment ID from request:", id);
    console.log("Fetched comment from DB:", comment);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log("Logged-in user ID:", req.user._id);
    console.log("Comment creator ID:", comment.user);

    if (comment.user.toString() !== req.user._id.toString()) {
      console.log("Unauthorized attempt to edit comment.");
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = text; 
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Failed to update comment" });
  }
});

router.delete("/comment/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params; 

  try {
    const comment = await Comment.findById(id);

    console.log("Comment ID from request:", id);
    console.log("Fetched comment from DB:", comment);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log("Logged-in user ID:", req.user._id);
    console.log("Comment creator ID:", comment.user);

    if (comment.user.toString() !== req.user._id.toString()) {
      console.log("Unauthorized attempt to delete comment.");
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.deleteOne({ _id: id });

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});



module.exports = router;
