import Login from "./naverlogin";
import axios from "axios";
import Profile from "./profile";

function MainPage() {
  return (
    <div>
      <Login></Login>
      <Profile></Profile>
    </div>
  );
}
export default MainPage;
