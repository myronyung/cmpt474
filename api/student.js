const router = require('express').Router();
const studentDb = require('../db/student');

router.get("/", async (req, res) => {
    try {
      const students = await studentDb.getStudents();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching students");
    }
  });

router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await studentDb.getStudent(studentId);
    if (student.length < 1) {
      throw {errorCode: 404, message: 'resource_not_found'};
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching student with ID ${studentId}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStudentId = await studentDb.addStudent(data);
    res.json({ message: `Student added successfully with ID: ${newStudentId}` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding student");
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = req.body;
    await studentDb.updateStudent(studentId, data);
    res.json({ message: `Student with ID ${studentId} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student");
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    await studentDb.deleteStudent(studentId);
    res.json({ message: `Student with ID ${studentId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting student");
  }
});

module.exports = router;