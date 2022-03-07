const data = require("../dotenv");
const { setToken } = require("./usercheck");
let access_token;
const getNaverToken = async (location) => {
  if (!location.hash) {
    console.error("!location.hash");
    return;
  }
  /**@type {string} token*/
  const token = await location.hash.split("=")[1].split("&")[0];
  setToken(await token);

  console.log(`setToken(${await token})`);
  return await token;
};

module.exports = { getNaverToken };
