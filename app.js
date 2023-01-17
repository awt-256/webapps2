const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/app", (req, res) => {
    res.sendFile(__dirname + "/views/list.html");
});

app.get("/app/item", (req, res) => {
    res.sendFile(__dirname + "/views/item.html");
});

app.listen(PORT, () => {
    console.log(`App server listening on ${PORT}. (http://localhost:${PORT})`);
});