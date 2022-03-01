//네이버 API를 통해 유저의 정보를 받아온다.

const getUserCheck = async () => {
  var data;
  await fetch("http://localhost:3002/auth/usercheck", {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      console.log("여기 어떄");
      data = res.json();
      console.log(data);
    })
    .catch((err) => {
      console.log("getUserCheck err", err);
    });
  if (!data) console.error("getUserCheck에서 데이터를 받지 못했습니다.");
  return data;
};
//서버에 네이버 API를 통해 받은 데이터를

const userCreate = async () => {
  await fetch("http://localhost:3002/auth/usercheck/create", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
};

const setToken = async (token) => {
  await fetch("http://localhost:3002", {
    method: "post",
    body: JSON.stringify({ access_token: token }),
    headers: { "Content-Type": "application/json" },
  });
};
const getToken = async () => {
  await fetch("http://localhost:3002", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result = await fetch("http://localhost:3002/auth", {
    method: "get",
    credentials: "include",
  })
    .then(async (res) => {
      var data = await res.json();
      return data;
    })
    .catch((err) => {
      console.error("getToken ERR", err);
    });
  if (!(await result).token)
    console.error("/auth에서 token을 받아오지 못했습니다.");
  console.log((await result).token);
  return (await result).token;
};
const setProfile = async (_token) => {
  const token = await getToken();
  console.log(await getToken());
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
    console.error("setProfile result err");
  }
  return result;
};

module.exports = {
  getUserCheck,
  userCreate,
  setProfile,
  setToken,
};
