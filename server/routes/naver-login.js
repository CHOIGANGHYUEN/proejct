const express = require("express");
const router = express.Router();
const db = require("../config/db");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
var token;
var user;

const setUser = (_user) => {
  user = _user;
};
const getUser = () => {
  return user;
};
router.post("/", async (req, res) => {
  token = await req.body.access_token;
});

router.get("/", async (req, res) => {
  res.cookie("access_token", token, {
    path: "/login/auth",
    httpOnly: true,
    maxAge: 100000,
  });
  res.redirect("/login/auth");
});
router.get("/auth", (req, res) => {
  try {
    const _token = req.cookies.access_token;
    if (_token === undefined) {
      console.log("쿠키 없음");
      res.send({ token: undefined });
    } else {
      console.log("auth", _token);
      res.send({ token: _token });
    }
  } catch (error) {
    console.log("no");
  }
});
router.get("/auth/member", function (req, res) {
  console.log("여기 실행?");
  const header = req.headers.authorization;
  console.log(header);
  var request = require("request");
  var api_url = "https://openapi.naver.com/v1/nid/me";
  var options = {
    url: api_url,
    headers: { Authorization: header },
  };

  const sendUserDataOption = (_body) => {
    return {
      url: "http://localhost:8080/login/auth/usercheck",
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
      } else console.log("API에서 user정보를 불러올 수 없습니다.");
    } else {
      if (response != null) {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    }
  });
});

router.get("/auth/usercheck", (req, res) => {
  const users = getUser();
  const user = users;

  if (!user) {
    console.log("유저 정보를 불러오지 못했습니다.");
    res.status(400).end("유저 정보를 불러오지 못했습니다.");
    return;
  } else {
    db.query(
      "SELECT * FROM user_db where user_id=?;",
      [user.id, user.id],
      (err, rows, field) => {
        if (err) {
          console.log("fault query : server/routes/userDB");
          throw err;
        }
        if (rows.length) {
          console.log("유저 정보를 불러왔습니다.");

          res.status(200).send(rows);
        } else {
          console.log("유저 정보를 불러오지 못했습니다.");

          res.send({
            data: {
              status: 400,
              body: "no",
            },
          });
        }
      }
    );
  }
});
router.get("/auth/usercheck/create", (req, res) => {
  const users = getUser();
  const user = users;
  db.query(
    "insert into user_db values (id,?,?,?,?,false)",
    [user.id, user.email, user.birthday, user.name, user.id],
    (err, results, fields) => {
      if (err) {
        console.log("계정이 이미 존재합니다.");
        db.query(
          "select * from user_db where user_id =?",
          user.id,
          (err, result, field) => {
            if (err) console.log("오류가 뜰리가없지");
            res.send(result);
          }
        );
      } else {
        console.log("계정이 성공적으로 만들어졌습니다.");
        db.query(
          "select * from user_db where user_id =?",
          user.id,
          (err, result, field) => {
            if (err) console.log("오류가 뜰리가없지");
            res.send(result);
          }
        );
      }
    }
  );
});
router.post("/auth/usercheck", async (req, res) => {
  var user = req.body;
  setUser(user);
});
router.get("/logout", (req, res) => {
  const user = getUser();
  db.query(
    "UPDATE user_db SET is_login=false WHERE user_id = ?",
    user.id,
    (err, res, field) => {
      console.log("유저 정보변경");
    }
  );
  // res.cookie("access_toekn", req.cookies.access_token, {
  //   path: "/auth",
  //   maxAge: 0,
  // });
  res
    .clearCookie("access_token", { path: "/login/auth" })
    .redirect("/login/auth");
});
router.get("/auth/login", (req, res) => {
  const users = getUser();
  const user = users;
  console.log("users", user);
  if (user.id)
    db.query("update user_db set is_login=true where user_id=?;", user.id);
});
module.exports = router;
