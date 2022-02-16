const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var token;
router.use(cookieParser());
router.post("/", async (req, res) => {
  token = await req.body.access_token;
});
router.get("/", async (req, res) => {
  try {
    console.log("쿠키로 보낼 데이터", token);
    res.cookie("access_token", token, {
      path: "/auth/member",
      httpOnly: true,
    });
    res.send(token);
  } catch (error) {
    console.error("err", err);
  }
});

router.get("/auth/member", async function (req, res) {
  var request = require("request");
  var token = await req.cookies.access_token;
  var header = "Bearer " + token; // Bearer 다음에 공백 추가
  console.log(header);
  var api_url = "https://openapi.naver.com/v1/nid/me";
  var options = {
    url: api_url,
    headers: { Authorization: header },
  };
  request.get(options, function (error, response, _body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(_body);
    } else {
      if (response != null) {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    }
  });
});
router.get("/clear", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});
module.exports = router;
