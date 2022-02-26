import { useEffect, useState } from "react";
import { getNaverToken } from "./getNaverToken";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  NaverAPIConnection,
  getUserCheck,
  outGetUserCheck,
  NaverUserProfile,
} from "./usercheck";

import data from "./dotenv";
console.log(data);
const { naver } = window;

function LoginBtn(props) {
  var token;
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: data.REACT_APP_Client_ID,
      callbackUrl: data.naver_login_url_test,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "white", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  async function fetchData() {
    const getData = axios.get("http://localhost:3002").catch((err) => {
      console.error("getData err :", err);
    });

    //만약 네이버 아이디가 데이터 베이스에 존재한다면
    //만약 네이버 아이디가 데이터 베이스에 존재하지 않는다면

    // setUserData(value.response.id);
    const postData = axios
      .post(
        "http://localhost:3002/",
        {
          access_token: token,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("post", res);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(`get = ${getData}\n post = ${postData}`);
  }
  try {
    useEffect(async () => {
      await initializeNaverLogin();
      token = await getNaverToken(location);

      // await NaverUserProfile(token);
      //유저가 존재하는지 검사
      await NaverAPIConnection(token);
      await fetchData();

      // fetch("/users")
      //   .then((res) => res.json())
      //   // json형식으로 받아온 값을 setState를 이용해 값을 재설정해줌
      //   .then((users) => setUsers(users));
    }, []);
  } catch (error) {
    console.log("에러가 뜨긴함?");
  }
  return (
    <div>
      <div id="naverIdLogin"></div>
    </div>
  );
}
export default LoginBtn;
