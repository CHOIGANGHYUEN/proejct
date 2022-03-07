import "./Header.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import ProfileComponent from "./login-page/component/profile";
import { testIs_Login } from "./login-page/api/usercheck";

function Header() {
  return (
    <div>
      <div id="header-info">
        <div id="lss">
          <nav id="categori">
            <Link to="/">
              <img className="logo-img" src="./logo.png" />
            </Link>
            <ul className="content-card">
              <li key="1">
                <a href="/feed">피드</a>
              </li>
              <li key="2">
                <a href="#">블로그</a>
              </li>
              <li key="3">
                <a href="#">마켓</a>
              </li>
              <li key="4">
                <a href="#">공지사항</a>
              </li>
              <li key="5">
                <a href="#">고객센터</a>
              </li>
            </ul>
          </nav>
          <div id="regist">
            <ProfileComponent props={testIs_Login()}></ProfileComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
