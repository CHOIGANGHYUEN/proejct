import axios from "axios";
import Logout from "./logout";
import LoginBtn from "./naverlogin";
import ProfileComponent from "./profile";
import RegisterBtn from "./register";

function MainPage() {
  return (
    <div>
      <LoginBtn></LoginBtn>
      <ProfileComponent></ProfileComponent>
      <Logout></Logout>
    </div>
  );
}
export default MainPage;
