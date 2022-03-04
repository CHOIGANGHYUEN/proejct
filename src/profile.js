import { useState, useEffect } from "react";
import LoginBtn from "./naverlogin";
import RegisterBtn from "./register";
import { getProfile } from "./usercheck";
function ProfileComponent(props) {
  const [Profile, setProfile] = useState([]);
  const test = async () => {
    const User = await getProfile();
    if (User.data && User.data.body === "no") {
      setProfile(User);
    } else {
      if ((await props.props) === 0) {
        setProfile(null);
        console.log("false");
        console.log(Profile);
      } else {
        console.log("true");

        setProfile(User);
      }
    }
  };
  // 가입하기 버튼을 누르면 fetch를 통해 /auth/usercheck/create로 넘어간ㄷ
  useEffect(() => {
    test();
  }, []);
  if (Profile === null) return <div>에러</div>;
  else if (Profile.data && Profile.data.body === "no")
    return <RegisterBtn></RegisterBtn>;
  else if (Profile[0])
    return (
      <div>
        <div>{Profile[0].user_id}</div>
        <div>hello</div>
        <div>{Profile[0].user_name}</div>
        <div>{Profile[0].user_birthday}</div>
      </div>
    );
  else
    return (
      <div>
        <LoginBtn></LoginBtn>
      </div>
    );
}
export default ProfileComponent;
