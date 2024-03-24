const {conn} = require("./db_pool");
const crypto = require('crypto');
const secret = 'proof-reader';
const hash = crypto.createHash('sha256', secret);

const addText = async (data) => {
  const textContent = data.TextContent;
  const studentId = data.StudentID || null;
  const textId = hash.update(text).digest('hex'); 
  await conn.query(
    "INSERT INTO student (StudentID, TextId, TextContent) VALUES (?, ?, ?, ?)",
    [studentId, textId, textContent]
  );
  return textHash;
}


  module.exports = {
    addText
  };