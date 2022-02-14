const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
var token;
router.use(cookieParser());
router.post("/", async (req, res) => {
  token = await req.body.token;
});
router.get("/", async (req, res) => {
  try {
    console.log("쿠키로 보낼 데이터", token);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    console.error("err", err);
  }
  res.send(req.cookies.access_token);
});
router.get("/clear", (req, res) => {
  res.clearCookie.access_token;
  res.redirect("/");
});
module.exports = router;
