require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");
const { findAllTitle } = require("./controllers/search/title");
const { findAllArtist } = require("./controllers/search/artist");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/signup", controllers.signup);
app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.get("/song", controllers.song);
app.post("/comment", controllers.comment);
app.patch("/edit-comment", controllers.editComment);
app.delete("/delete-comment", controllers.deleteComment);
app.get("/title", findAllTitle);
app.get("/artist", findAllArtist);
app.get("/user-info", controllers.userInfo);
app.patch("/edit-user-info", controllers.editUserInfo);
app.delete("/withdrawal", controllers.withdrawal);
app.get("/my-like", controllers.myLike);
app.delete("/delete-my-like", controllers.deleteMyLike);
// app.post('/recommendation', controllers.recommendation);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(`https server running on port ${HTTPS_PORT}`)
  );
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log(`http server running on port ${HTTPS_PORT}`)
  );
}

module.exports = server;
