import { useEffect } from "react";
import { getNaverToken } from "../api/getNaverToken";
import { useLocation } from "react-router-dom";
import { Login, setProfileWithNaverAPI } from "../api/usercheck";

import data from "../dotenv";
console.log(data);
const { naver } = window;

function LoginBtn(props) {
  const location = useLocation();
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: data.REACT_APP_Client_ID,
      callbackUrl: "http://localhost:3000/login",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "white", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  try {
    useEffect(async () => {
      await initializeNaverLogin();
      await getNaverToken(location);
    }, []);
  } catch (error) {}
  return (
    <div
      id="naverIdLogin"
      onClick={async () => {
        setProfileWithNaverAPI();
        await Login();
      }}
    ></div>
  );
}
export default LoginBtn;
