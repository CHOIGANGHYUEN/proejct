import { useState, useEffect } from "react";
import { getProfile } from "../api/usercheck";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Logout from "./logout";
import RegisterBtn from "./register";
function ProfileComponent(props) {
  const [Profile, setProfile] = useState([]);
  const test = async () => {
    const User = await getProfile();
    if (!User) console.error("profile.js => !User");
    if (User.data && User.data.body === "no") {
      setProfile(User);
    } else {
      if ((await props.props) === 0) {
        setProfile(null);
      } else {
        setProfile(User);
      }
    }
  };
  // 가입하기 버튼을 누르면 fetch를 통해 /auth/usercheck/create로 넘어간ㄷ
  useEffect(() => {
    test();
  }, []);

  if (Profile && Profile.data && Profile.data.body === "no")
    return <RegisterBtn></RegisterBtn>;
  else if (Profile !== null && Profile[0])
    return (
      <div>
        <div>{Profile[0].user_name}님</div>
        <div>안녕하세요</div>
        <Logout></Logout>
      </div>
    );
  else
    return (
      <Link to="/login">
        <Button>로그인</Button>
      </Link>
    );
}
export default ProfileComponent;
