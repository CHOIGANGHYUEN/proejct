const express = require("express");
const router = express.Router();
const connection = require("../../db/index");
const userDBRouter = require("../routes/userDB");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(userDBRouter);

var token;
router.use(cookieParser());

router.post("/", async (req, res) => {
  token = await req.body.access_token;
  console.log("token", token);
});

router.get("/", async (req, res) => {
  console.log("쿠키로 보낼 데이터", token);

  res.cookie("access_token", token, {
    path: "/auth",
    httpOnly: true,
  });
  res.send(token);
});
router.get("/auth", (req, res) => {
  const _token = req.cookies.access_token;
  console.log("auth", _token);
  res.send({ token: _token });
});
router.get("/auth/member", function (req, res) {
  const header = req.headers.authorization;
  var request = require("request");
  var api_url = "https://openapi.naver.com/v1/nid/me";
  var options = {
    url: api_url,
    headers: { Authorization: header },
  };
  var getUserDataOption = {
    url: "http://localhost:3002/auth/usercheck",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const sendUserDataOption = (_body) => {
    return {
      url: "http://localhost:3002/auth/usercheck",
      body: _body,

      headers: {
        "Content-Type": "application/json",
      },
      json: true,
    };
  };
  request.get(options, function (error, response, _body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      var { response: user } = JSON.parse(_body);
      if (user) {
        //userCheck로 데이터 전송
        request.post(
          sendUserDataOption(user),
          (_error, _response, userCheckBody) => {
            if (!_error && _response.statusCode == 200) {
              console.log("post실행");
            } else {
              if (_response != null) {
                res.status(_response.statusCode).end();
                console.log("POST _error = " + _response.statusCode);
              }
            }
          }
        );
        //userCheck에 저장된 데이터 호출
        request.get(getUserDataOption, (_error, _response, userCheckBody) => {
          if (!_error && _response.statusCode == 200) {
            const isUser = JSON.parse(userCheckBody);
            if (isUser) {
              if (isUser.data) {
                res.end(isUser.data);
              }
            }
          } else {
            if (_response != null) {
              res.status(_response.statusCode).end();
              console.log("GET _error = " + _response.statusCode);
            }
          }
        });
      } else console.log("API에서 user정보를 불러올 수 없습니다.");
    } else {
      if (response != null) {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    }
  });
});
router.get("/auth/clear", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});
module.exports = router;
