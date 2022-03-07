const { Login_URL } = require("../../config/constant");
function Logout() {
  const logout = async () => {
    await fetch(`${Login_URL}/logout`, {
      method: "get",
      credentials: "include",
    });
    console.log("logout");
    window.location.reload();
  };
  return <button onClick={logout}>로그아웃</button>;
}
export default Logout;
