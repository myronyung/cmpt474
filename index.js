const express = require("express");
const app = express();
const port = 8080;

const studentRoute = require("./api/student");
const textRoute = require("./api/text");
const commentRoute = require("./api/comment");

app.use(express.json());
app.use('/student', studentRoute);
app.use('/text', textRoute);
app.use('/comment', commentRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});