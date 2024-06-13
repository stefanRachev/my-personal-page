const Comment = require("../models/Comment");

const getComments = async (imageId) => {
  try {
    const comments = await Comment.find({ imageId }).sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    throw new Error("Error fetching comments:", error);
  }
};

const addComment = async (data) => {
  try {
    const { imageId, text, author } = data;
    const newComment = new Comment({ imageId, text, author });
    await newComment.save();
    return newComment;
  } catch (error) {
    throw new Error("Error adding comment:", error);
  }
};

module.exports = {
  getComments,
  addComment,
};
