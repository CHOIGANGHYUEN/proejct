const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes/index");
const loginApi = require("./routes/naver-login");
const port = process.env.Port || 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api", api);
app.use("/login", loginApi);
app.listen(port, () => {
  console.log("port server : ", { port });
});
