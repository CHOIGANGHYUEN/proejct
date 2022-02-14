var indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");
var token;
const cors = require("cors");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loginRouter);
app.use(userRouter);

app.listen(3002, function () {
  console.log("http://127.0.0.1:3000/member app listening on port 3000!");
});
