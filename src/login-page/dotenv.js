//REACT_APP_Client_Secret = sgrSKbp_hl;
const REACT_APP_Client_ID = "f7O3cnD0YRUedj9GALJc";
const HELLO = "hello";
var access_token;
const naver_login_url = "http://7849-211-223-8-106.ngrok.io";
const naver_login_url_test = "http://localhost:3000";

const naver_login_callback_url =
  "http://7849-211-223-8-106.ngrok.io/auth/naver/callback";
const naver_login_callback_url_test = "http://localhost:3000";
const mySqlPassword = "rkdgus1234!?";
const data = {
  REACT_APP_Client_ID,
  HELLO,
  access_token,
  naver_login_url,
  naver_login_callback_url,
  naver_login_url_test,
  naver_login_callback_url_test,
  mySqlPassword,
};
module.exports = data;
