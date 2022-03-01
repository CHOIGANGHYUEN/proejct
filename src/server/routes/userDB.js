const { urlencoded } = require("body-parser");
const express = require("express");
const router = express.Router();
const connection = require("../../db/index");
var user;
const setUser = (_user) => {
  user = _user;
};
const getUser = () => {
  return user;
};
// const setIsUser = (isUser) => {
//   isUser = true;
// };
// const getIsUser = () => {
//   return isUser;
// };
router.get("/auth/usercheck", (req, res) => {
  const users = getUser();
  const user = users;
  console.log(user);

  if (!user) {
    console.log("유저 정보를 불러오지 못했습니다.");
    res.status(400).end("유저 정보를 불러오지 못했습니다.");
    return;
  } else {
    connection.query(
      "SELECT * FROM user_db where user_id=?",
      user.id,
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
  connection.query(
    "insert into user_db values (id,?,?,?,?)",
    [user.id, user.email, user.birthday, user.name, user.id],
    (err, results, fields) => {
      if (err) {
        console.log("계정이 이미 존재합니다.");
        connection.query(
          "select * from user_db where user_id =?",
          user.id,
          (err, result, field) => {
            if (err) console.log("오류가 뜰리가없지");
            res.send(result);
          }
        );
      } else {
        console.log("계정이 성공적으로 만들어졌습니다.");
        connection.query(
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
  var id = req.body;
  setUser(user);
});
module.exports = router;
