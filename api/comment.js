const router = require('express').Router();
const commentDb = require('../db/comment');
const handleError = require('./handleError');

router.get("/", async (req, res) => {
  const textId = req.query.TextId;
  try {
    const text = await commentDb.getAllTextComments(textId);
    res.json(text);
  } catch (error) {
    handleError(error, res, `Error fetching comment from text ID ${textId}`);
  }
});

router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const text = await commentDb.getComment(commentId);
    res.json(text);
  } catch (error) {
    handleError(error, res, `Error fetching comment with ID ${commentId}`);
  }
  });

router.post("/", async (req, res) => {
  const textId = req.query.TextId;
  try {
    const data = req.body;
    const newCommentId = await commentDb.addComment(textId, data);
    res.json({ message: `Comment added successfully with ID: ${newCommentId}` });
  } catch (error) {
    handleError(error, res, `Error adding comment`);
  }
});

router.put("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const data = req.body;
    await commentDb.updateComment(commentId, data);
    res.json({ message: `Comment with ID ${commentId} updated successfully` });
  } catch (error) {
    handleError(error, res, `Error updating comment`);
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    await commentDb.deleteComment(commentId);
    res.json({ message: `Comment with ID ${commentId} deleted successfully` });
  } catch (error) {
    handleError(error, res, `Error deleting comment`);
  }
});

module.exports = router;
