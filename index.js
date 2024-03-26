const express = require("express");
const app = express();
const port = 8080;

const studentRoute = require("./api/student");
const textRoute = require("./api/text");
const commentRoute = require("./api/comment");

/*
//Student
GET /student
GET /student/{studentId}
POST /student
PUT /student/{studentId}
DELETE /student/{studentId}

//Text
GET /text
GET /text?StudentId={studentId}
GET /text/{textId}
POST /text
PUT /text/{textId}
DELETE /text/{textId}

//Comment
GET /comment?TextId={textId}
GET /comment/{commentId}
POST /comment?TextId={textId}
PUT /comment/{commentId}
DELETE /comment/{commentId}
*/

app.use(express.json());
app.use('/student', studentRoute);
app.use('/text', textRoute);
app.use('/comment', commentRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});