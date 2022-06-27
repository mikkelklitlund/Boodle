const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");

const registerRoute = require("./routes/register.js");
const aboutRoute = require("./routes/about.js");

//explicitly added hostname
const hostname = "127.0.0.1";
// Arbitrary port, should be between 3090-3099
const port = 3090;
// Initialization of Express
const app = express();
// For making files accessible in directory
app.use("/public", express.static("../website"));
app.set("views", path.join(process.cwd(), "../website/resources"));
app.set("view engine", "pug");

// Creates HTTP server
http.createServer(app).listen(port, hostname, () => {
	console.log(`Server Running at http://165.22.18.133/`);
});

// Moves HTTP methods on /register to ./routes/register.js
app.use("/register", registerRoute);
app.use("/about", aboutRoute);

// Testing
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "website/resources/webpage.html"));
});

app.post("/", (req, res) => {
	console.log("post");
	let body = "";
	filePath = __dirname + "/data.txt";
	req.on("data", (data) => {
		body += data;
	});

	req.on("end", () => {
		console.log(body + "\n" + filePath);
		moodleToken = body;
		fs.appendFile(filePath, body, () => {
			res.end();
		});
	});
});
