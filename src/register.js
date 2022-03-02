import { userCreate } from "./usercheck";

function RegisterBtn() {
  const createUser = async () => {
    await userCreate();
    window.location.reload();
  };

  return (
    <button className="open" onClick={createUser} value="false">
      가입하기
    </button>
  );
}
export default RegisterBtn;
