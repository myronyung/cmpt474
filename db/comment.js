const {customAlphabet} = require('nanoid/non-secure');
const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);
const {getPool} = require('./pool');
const {getText} = require('./text');

const getComment = async (commentId) => {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM comments WHERE CommentId = ?", 
        [commentId]
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

const addComment = async (textId, data) => {
    const text = await getText(textId);
    if (text.length < 1) {
        throw {errorCode: 404, message: 'resource_not_found'};
    }

    const pool = await getPool();
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

    await pool.query(
        "UPDATE comments SET CommentContent = ? WHERE CommentId = ?",
        [commentContent, commentId]
    );
}

const deleteComment = async (commentId) => {
    const pool = await getPool();
    await pool.query("DELETE FROM comments WHERE CommentId = ?", 
        [commentId]
    );
}

module.exports = {
  getComment,
  getAllTextComments,
  addComment,
  updateComment,
  deleteComment
};