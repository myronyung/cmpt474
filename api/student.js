const router = require('express').Router();
const studentDb = require('../db/student');
const handleError = require('./handleError');

router.get("/", async (req, res) => {
    try {
      const students = await studentDb.getStudents();
      res.json(students);
    } catch (error) {
      handleError(error, res, "Error fetching students");
    }
  });

router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await studentDb.getStudent(studentId);
    res.json(student);
  } catch (error) {
    handleError(error, res, `Error fetching student with ID ${studentId}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStudentId = await studentDb.addStudent(data);
    res.json({ message: `Student added successfully with ID: ${newStudentId}` });
  } catch (error) {
    handleError(error, res, "Error adding student");
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = req.body;
    await studentDb.updateStudent(studentId, data);
    res.json({ message: `Student with ID ${studentId} updated successfully` });
  } catch (error) {
    handleError(error, res, "Error updating student");
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    await studentDb.deleteStudent(studentId);
    res.json({ message: `Student with ID ${studentId} deleted successfully` });
  } catch (error) {
    handleError(error, res, "Error deleting student");
  }
});

module.exports = router;