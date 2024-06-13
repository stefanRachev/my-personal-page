const router = require("express").Router();

const { getComments, addComment } = require("../services/commentService");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    const comments = await getComments(imageId);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const { imageId, text } = req.body;
    const author = req.user.nickName;
    const newComment = await addComment({ imageId, text, author });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
