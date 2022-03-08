import LoginBtn from "./component/naverlogin";
import { Card, Divider, Button, Form, Input } from "antd";
import "./index.css";
import { idpwButtonStyle, idpwInputStyle } from "./style/componentStyle";
function LoginPage() {
  return (
    <div id="body">
      <div id="imgSpace">
        <img src="..\images\map-image\경주.jpeg"></img>
      </div>
      <div id="loginSpace">
        <Form id="loginForm">
          <Input id="id" placeholder="ID" style={idpwInputStyle}></Input>
          <Input id="pw" placeholder="password" style={idpwInputStyle}></Input>
          <Button type="primary" block style={idpwButtonStyle}>
            로그인
          </Button>
        </Form>
        <Divider>또는</Divider>
        <div id="API">
          <LoginBtn></LoginBtn>
          <span>네이버로 로그인</span>
        </div>
        <Divider>가입하기</Divider>

        <div id="RegisterSpace">
          <Button type="primary" block style={idpwButtonStyle}>
            가입하기
          </Button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
