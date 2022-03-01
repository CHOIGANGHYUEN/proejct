import { useState, useEffect } from "react";
import RegisterBtn from "./register";
import { getUserCheck } from "./usercheck";
function ProfileComponent() {
  const [Profile, setProfile] = useState([]);
  // 가입하기 버튼을 누르면 fetch를 통해 /auth/usercheck/create로 넘어간ㄷ
  useEffect(async () => {
    setProfile(await getUserCheck());
  }, []);
  console.log(Profile[0]);

  if (Profile.data && Profile.data.body === "no")
    return <RegisterBtn></RegisterBtn>;
  else if (Profile[0])
    return (
      <div>
        <div>{Profile[0].user_id}</div>
        <div>{Profile[0].user_name}</div>
        <div>{Profile[0].user_birthday}</div>
      </div>
    );
  else return <div>err</div>;
}
export default ProfileComponent;
