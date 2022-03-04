import axios from "axios";
import { useState, useEffect } from "react";
import Logout from "./logout";
import LoginBtn from "./naverlogin";
import ProfileComponent from "./profile";
import RegisterBtn from "./register";
import { testIs_Login } from "./usercheck";

function MainPage() {
  return (
    <div>
      <ProfileComponent props={testIs_Login()}></ProfileComponent>
      <Logout></Logout>
    </div>
  );
}
export default MainPage;
