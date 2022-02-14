import { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
  const [id, setID] = useState([]);
  const userID = "";

  useEffect(async () => {
    await axios.get("http://localhost:3002/member").then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <div id="userID">{userID}</div>
      <div>hello</div>
    </div>
  );
}
export default Profile;
