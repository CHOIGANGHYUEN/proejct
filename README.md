# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `시작`

SRC에 dotenv.js 파일을 만들고
const REACT_APP_Client_ID = "yourClientID";
const mySqlPassword = "yourMySqlPassword";

module.exports = {REACT_APP_Client_ID,mySqlPassword}
또한 각자 callback url을 추가로 지정해주어야한다. naverlogin.js의 CALLBACKURL
