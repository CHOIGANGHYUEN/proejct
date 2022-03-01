import axios from "axios";
import LoginBtn from "./naverlogin";
import ProfileComponent from "./profile";
import RegisterBtn from "./register";

function MainPage() {
  return (
    <div>
      <LoginBtn></LoginBtn>
      <ProfileComponent></ProfileComponent>
    </div>
  );
}
export default MainPage;
