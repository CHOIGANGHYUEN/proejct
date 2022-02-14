const data = require("./dotenv");
let access_token;
function setAccess_token(access_token) {}
const getNaverToken = async (location) => {
  if (!location.hash) {
    console.error("!location.hash");
    return;
  }
  /**@type {string} token*/
  const token = await location.hash.split("=")[1].split("&")[0];
  console.log("getNaverToken : ", token);
  return token;
};
const outputToken = () => {
  return access_token;
};
module.exports = { getNaverToken, outputToken };
