const http = require("http");
const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

//explicitly added hostname
const hostname = "127.0.0.1";
// Arbitrary port, should be between 3090-3099
const port = 3090;
// Initialization of Express
const app = express();
const server = http.createServer(app).listen(port, hostname, () => {
    console.log(`Server Running at http://localhost:${port}`);
});
// For making files accessible in directory
app.use("/public", express.static("../website"));
app.set("views", path.join(process.cwd(), "../website/resources"));
app.set("view engine", "pug");

// Testing
app.get("/", (req, res) => {
  // res.send('TisTest');
  res.sendFile(path.join(__dirname, "..", "website/resources/webpage.html"));
});

exports.app = app;
exports.server = server;