import LoginBtn from "./component/naverlogin";
import { Card, Divider, Button, Form, Input } from "antd";
import "./index.css";
import { idpwButtonStyle, idpwInputStyle } from "./style/componentStyle";
function LoginPage() {
  return (
    <div id="body">
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
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
