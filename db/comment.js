const {customAlphabet} = require('nanoid/non-secure');
const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);
const {getPool} = require('./pool');
const {getText} = require('./text');

const getComment = async (commentId) => {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM comments WHERE CommentId = ?", 
        [textId]
    );
    return rows;
}

//add textid index in comments table if slow response
const getAllTextComments = async (textId) => {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM comments WHERE TextId = ?", 
        [textId]
    );
    return rows;
}

const addComment = async (data) => {
    const text = await getText(data.TextId);
    if (text.length < 1) {
        throw {errorCode: 404, message: 'resource_not_found'};
    }

    const pool = await getPool();
    const textId = data.TextId;
    const commentContent = data.CommentContent;
    const commentId = `comment-${nanoId()}`;

    await pool.query(
    "INSERT INTO comments (TextId, CommentId, CommentContent) VALUES (?, ?, ?)",
    [textId, commentId, commentContent]
    );
    return commentId;
}

const updateComment = async (commentId, data) => {
    const [commentData] = await getComment(commentId);
    if (!commentData) {
        throw {errorCode: 404, message: 'resource_not_found'};
    }
    
    const pool = await getPool();
    const commentContent = data.CommentContent || commentData.CommentContent;
    const textId = data.TextId || commentData.TextId;

    await pool.query(
        "UPDATE comments SET StudentId = ?, CommentContent = ? WHERE CommentId = ?",
        [textId, commentContent, commentId]
    );
}

const deleteText = async (commentId) => {
    const pool = await getPool();
    await pool.query("DELETE FROM comments WHERE CommentId = ?", 
        [commentId]
    );
}

module.exports = {
  getText,
  getAllTextComments,
  addComment,
  updateComment,
  deleteText
};