const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.get("/member", async function (req, res) {
  var token = await req.cookies.access_token;
  console.log("/member :", token);
  var header = "Bearer " + token; // Bearer 다음에 공백 추가
  var api_url = "https://openapi.naver.com/v1/nid/me";
  var request = require("request");
  var options = {
    url: api_url,
    headers: { Authorization: header },
  };
  console.log(options);
  var body;
  await request.get(options, async function (error, response, _body) {
    console.log(`err : ${error}, res : ${response.statusCode}`);
    if (!error && response.statusCode == 200) {
      res.set("text/json;charset=utf-8");
      body = await _body;
    } else {
      if (response != null) {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    }
  });
  await res.send(body);
});
module.exports = router;
