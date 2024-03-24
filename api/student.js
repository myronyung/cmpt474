app.get("/students", async (req, res) => {
    try {
      const students = await student.getStudents();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching students");
    }
  });
  
  app.post("/students", async (req, res) => {
    try {
      const data = req.body;
      const newStudentId = await student.addStudent(data);
      res.json({ message: `Student added successfully with ID: ${newStudentId}` });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding student");
    }
  });
  
  app.put("/students/:studentId", async (req, res) => {
    try {
      const { studentId } = req.params;
      const data = req.body;
      await student.updateStudent(studentId, data);
      res.json({ message: `Student with ID ${studentId} updated successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating student");
    }
  });
  
  app.delete("/students/:studentId", async (req, res) => {
    try {
      const { studentId } = req.params;
      await student.deleteStudent(studentId);
      res.json({ message: `Student with ID ${studentId} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting student");
    }
  });