import { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
  const [id, setID] = useState([]);
  const userID = "";
  useEffect((e) => {
    async function fetchData() {
      axios.defaults.withCredentials = true;

      const result = await axios.get("http://localhost:3002/auth/member", {});
      setID(result.data.response.id);
      console.log(result);
    }

    fetchData();
  }, []);
  return (
    <div>
      <div id="userID">{id}</div>
      <div>hello</div>
    </div>
  );
}
export default Profile;
