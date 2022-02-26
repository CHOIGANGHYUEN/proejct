//네이버 API를 통해 유저의 정보를 받아온다.
const NaverAPIListen = async (token) => {
  const result = await fetch("http://localhost:3002/auth/member", {
    method: "GET",
    headers: {
      credentials: "include",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .then((data) => {
      return data;
    });
  console.log("result ", result);
  return result;
};
//
const getUserCheck = async () => {
  var data;
  await fetch("http://localhost:3002/auth/usercheck", {
    method: "GET",
  })
    .then(async (res) => {
      data = res.json();
    })
    .catch((err) => {
      console.log("getUserCheck err", err);
    });
  if (!data) console.error("getUserCheck에서 데이터를 받지 못했습니다.");
  return data;
};
//서버에 네이버 API를 통해 받은 데이터를
const NaverAPIConnection = async (token) => {
  const Profile = JSON.stringify(await NaverAPIListen(token));
  await fetch("http://localhost:3002/auth/usercheck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: Profile,
  }).then((res) => {
    console.log("여긴?", res);
  });
};
const userCreate = async () => {
  await fetch("http://localhost:3002/auth/usercheck/create", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
};
const NaverUserProfile = async (token) => {
  const result = await fetch("http://localhost:3002/auth/member", {
    method: "get",
    headers: {
      credentials: "include",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .then((data) => {
      return data;
    });
  if (!result) {
    console.error("NaverUserProfile result err");
  }
  return result;
};

module.exports = {
  NaverAPIConnection,
  getUserCheck,
  userCreate,
  NaverUserProfile,
};
