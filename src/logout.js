function Logout() {
  const logout = async () => {
    await fetch("http://localhost:3002/logout", {
      method: "get",
      credentials: "include",
    });
    console.log("logout");
    window.location.reload();
  };
  return <button onClick={logout}>๋ก๊ทธ์์</button>;
}
export default Logout;
