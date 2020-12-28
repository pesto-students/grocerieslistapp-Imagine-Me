const express = require("express");
const path = require("path");

const app = express();

app.use("/src", express.static(path.resolve(__dirname, "src")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(process.env.PORT || 8000, () => console.log("Server running port 8000..."));
