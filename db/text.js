const crypto = require('crypto');
const secret = 'proof-reader';
const hash = crypto.createHash('sha256', secret);
const {getPool} = require('./pool');

const getText = async (textId) => {
  const pool = await getPool();
  const [rows] = await pool.query("SELECT * FROM texts WHERE TextId = ?", 
      [textId]
  );
  return rows;
}

//add studentid index in texts table if slow response
const getAllStudentText = async (studentId) => {
  const pool = await getPool();
  const [rows] = await pool.query("SELECT * FROM texts WHERE StudentId = ?", 
      [studentId]
  );
  return rows;
}

const addText = async (data) => {
  const pool = await getPool();
  const textContent = data.TextContent;
  const studentId = data.StudentID || null;
  const textId = hash.update(text).digest('hex');

  await pool.query(
    "INSERT INTO texts (StudentID, TextId, TextContent) VALUES (?, ?, ?)",
    [studentId, textId, textContent]
  );
  return textId;
}

const updateText = async (textId, data) => {
  const pool = await getPool();
  const [textData] = await getText(textId);
  const textContent = data.TextContent || textData.TextContent;
  const studentId = data.StudentID || textData.StudentID;

  await pool.query(
    "UPDATE texts SET StudentId = ?, textContent = ? WHERE textId = ?",
    [studentId, textContent, textId]
  );
}

const deleteText = async (textId) => {
  const pool = await getPool();
  await pool.query("DELETE FROM texts WHERE textId = ?", 
    [textId]
  );
}

module.exports = {
  getText,
  getAllStudentText,
  addText,
  updateText,
  deleteText
};