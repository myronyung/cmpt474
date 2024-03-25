const express = require("express");
const app = express();
const port = 8080;

const studentRoute = require("./api/student");
const textRoute = require("./api/text");

app.use(express.json());
app.use('/student', studentRoute);
app.use('/text', textRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});