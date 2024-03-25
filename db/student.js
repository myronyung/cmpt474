const {customAlphabet} = require('nanoid/non-secure');
const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);
const {getPool} = require('./pool');

const getStudents = async () => {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM student");
    return rows;
}

const getStudent = async (studentId) => {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM student WHERE StudentId = ?", 
        [studentId]
    );
    return rows;
}

const addStudent = async (data) => {
    const pool = await getPool();
    const firstName = data.FirstName;
    const lastName = data.LastName;
    const studentId = `student-${nanoId()}`;

    await pool.query(
        "INSERT INTO student (FirstName, LastName, StudentID) VALUES (?, ?, ?)",
        [firstName, lastName, studentId]
    );
    return studentId;
}

const updateStudent = async (studentId, data) => {
    const [studentData] = await getStudent(studentId);
    if (!studentData) {
        throw {errorCode: 404, message: 'resource_not_found'};
    }

    const pool = await getPool();
    const firstName = data.FirstName || studentData.FirstName;
    const lastName = data.LastName || studentData.LastName;
    await pool.query(
        "UPDATE student SET FirstName = ?, LastName = ? WHERE StudentID = ?",
        [firstName, lastName, studentId]
    );
}

const deleteStudent = async (studentId) => {
    const pool = await getPool();
    await pool.query("DELETE FROM student WHERE StudentId = ?", 
        [studentId]
    );
}

module.exports = {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent
};