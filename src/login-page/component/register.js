import { userCreate } from "../api/usercheck";

function RegisterBtn() {
  const createUser = async () => {
    await userCreate().catch((err) => {
      console.error("register.js => createUserErr");
    });
    window.location.reload();
  };

  return (
    <button className="open" onClick={createUser} value="false">
      가입하기다
    </button>
  );
}
export default RegisterBtn;
