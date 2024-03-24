const {conn} = require("./db_pool");
const {customAlphabet} = require('nanoid/non-secure');
const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);

const getStudents = async () => {
  const [rows] = await conn.query("SELECT * FROM student");
  return rows;
  }
  
const addStudent = async (data) => {
  const firstName = data.FirstName;
  const lastName = data.LastName;
  const studentId = nanoId();

  await conn.query(
    "INSERT INTO student (FirstName, LastName, StudentID) VALUES (?, ?, ?)",
    [firstName, lastName, studentId, text]
  );
  return studentId;
}

const updateStudent = async (id, data) => {
  const firstName = data.FirstName;
  const lastName = data.LastName;

  await conn.query(
    "UPDATE student SET FirstName = ?, LastName = ? WHERE StudentID = ?",
    [firstName, lastName, id]
  );
}

const deleteStudent = async (id) => {
  await conn.query("DELETE FROM students WHERE StudentId = ?", 
  [id]
  );
}

  module.exports = {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };