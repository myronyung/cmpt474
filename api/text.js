const router = require('express').Router();
const textDb = require('../db/text');
const handleError = require('./handleError');

router.get("/", async (req, res) => {
  const studentId = req.query.StudentId;
  try {
    const text = !studentId ? await textDb.getAllText() : await textDb.getAllStudentText(studentId);
    res.json(text);
  } catch (error) {
    handleError(error, res, `Error fetching text from student ID ${studentId}`);
  }
});

router.get("/:textId", async (req, res) => {
  const { textId } = req.params;
  try {
    const text = await textDb.getText(textId);
    res.json(text);
  } catch (error) {
    handleError(error, res, `Error fetching text with ID ${textId}`);
  }
  });

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newTextId = await textDb.addText(data);
    res.json({ message: `Text added successfully with ID: ${newTextId}` });
  } catch (error) {
    handleError(error, res, `Error adding text`);
  }
});

router.put("/:textId", async (req, res) => {
  try {
    const { textId } = req.params;
    const data = req.body;
    await textDb.updateText(textId, data);
    res.json({ message: `Text with ID ${textId} updated successfully` });
  } catch (error) {
    handleError(error, res, `Error updating text`);
  }
});

router.delete("/:textId", async (req, res) => {
  try {
    const { textId } = req.params;
    await textDb.deleteText(textId);
    res.json({ message: `Text with ID ${textId} deleted successfully` });
  } catch (error) {
    handleError(error, res, `Error deleting text`);
  }
});

module.exports = router;
