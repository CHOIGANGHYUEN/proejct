import { useEffect, useState } from "react";
import { getNaverToken } from "./getNaverToken";
import { useLocation } from "react-router-dom";
import axios from "axios";
import data from "./dotenv";
console.log(data);
const { naver } = window;
console.log("naver", naver);
function Login(props) {
  var token;
  const location = useLocation();
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: data.REACT_APP_Client_ID,
      callbackUrl: "http://localhost:3000",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "white", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(async () => {
    await initializeNaverLogin();
    token = await getNaverToken(location);
    console.log("access_token : ", token);
    await axios
      .get("http://localhost:3002/")
      .then((res) => {
        console.log("get :", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    await axios
      .post(
        "http://localhost:3002/",
        {
          token: token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("post", res);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
    // fetch("/users")
    //   .then((res) => res.json())
    //   // json형식으로 받아온 값을 setState를 이용해 값을 재설정해줌
    //   .then((users) => setUsers(users));
  }, []);
  return <div id="naverIdLogin"></div>;
}
export default Login;