const crypto = require('crypto');
const secret = 'proof-reader';
const hash = crypto.createHash('sha256', secret);
const {getPool} = require('./pool');

const getText = async (textId) => {
  const pool = await getPool();
  const [rows] = await pool.query("SELECT * FROM texts WHERE TextId = ?", 
    [textId]
  );

  if (rows.length < 1) {
    throw {errorCode: 404, message: 'resource_not_found'};
  }
  return rows;
}

const getAllText = async (textId) => {
  const pool = await getPool();
  const [rows] = await pool.query("SELECT * FROM texts", 
    [textId]
  );

  if (rows.length < 1) {
    throw {errorCode: 404, message: 'resource_not_found'};
  }
  return rows;
}

//add studentid index in texts table if slow response
const getAllStudentText = async (studentId) => {
  const pool = await getPool();
  const [rows] = await pool.query("SELECT * FROM texts WHERE StudentId = ?", 
    [studentId]
  );
  
  if (rows.length < 1) {
    throw {errorCode: 404, message: 'resource_not_found'};
  }
  return rows;
}

const addText = async (data) => {
  const pool = await getPool();
  const textContent = data.TextContent;
  const studentId = data.StudentID || null;
  const textId = `text-${hash.copy().update(textContent).digest('hex')}`;

  await pool.query(
    "INSERT INTO texts (StudentID, TextId, TextContent) VALUES (?, ?, ?)",
    [studentId, textId, textContent]
  );
  return textId;
}

const updateText = async (textId, data) => {
  const [textData] = await getText(textId);

  const pool = await getPool();
  const textContent = data.TextContent || textData.TextContent;
  const studentId = data.StudentId || textData.StudentId;

  await pool.query(
    "UPDATE texts SET StudentId = ?, TextContent = ? WHERE TextId = ?",
    [studentId, textContent, textId]
  );
}

const deleteText = async (textId) => {
  const pool = await getPool();
  await pool.query("DELETE FROM texts WHERE TextId = ?", 
    [textId]
  );
}

module.exports = {
  getText,
  getAllText,
  getAllStudentText,
  addText,
  updateText,
  deleteText
};