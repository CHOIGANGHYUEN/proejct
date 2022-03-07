//네이버 API를 통해 유저의 정보를 받아온다.
const { Login_URL } = require("../../config/constant");
const Login = async () => {
  await fetch(`${Login_URL}/auth/login`, {
    method: "get",
  });
};
const testIs_Login = async () => {
  const setProfile = (await getProfile())[0];

  return (await setProfile).is_login;
};
const getProfile = async () => {
  var data;
  await fetch(`${Login_URL}/auth/usercheck`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      data = res.json();
    })
    .catch((err) => {
      console.log("usercheck.js = > getProfile err", err);
    });
  if (!data) console.error("getUserCheck에서 데이터를 받지 못했습니다.");
  else {
    return data;
  }
};
//서버에 네이버 API를 통해 받은 데이터를

const userCreate = async () => {
  await fetch(`${Login_URL}/auth/usercheck/create`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
};

const setToken = async (token) => {
  await fetch(`${Login_URL}`, {
    method: "post",
    body: JSON.stringify({ access_token: token }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error("usercheck.js => setToken ERR");
  });
};
const getToken = async () => {
  console.log("2");
  await fetch(`${Login_URL}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(async (res) => console.log(res));
  const data = await getAPIToken();
  if (data === undefined) return undefined;
  else return data;
};
const getAPIToken = async () => {
  const result = await fetch(`${Login_URL}/auth`, {
    method: "get",
    credentials: "include",
  })
    .then(async (res) => {
      var data = res.json();
      return data;
    })
    .catch((err) => {
      console.error("getToken ERR", err);
    });
  if (!(await result).token)
    console.error("/auth에서 token을 받아오지 못했습니다.");

  return (await result).token;
};
const setProfileWithNaverAPI = async () => {
  const token = await getToken();
  if (!token) console.log("setProfileWithNaverAPI Err");

  const result = await fetch(`${Login_URL}/auth/member`, {
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
    })
    .catch((err) => {
      console.error("usercheck.js = > setProfileWithNaverAPI result err");
    });
};

module.exports = {
  getProfile,
  userCreate,
  setProfileWithNaverAPI,
  setToken,
  testIs_Login,
  Login,
};
