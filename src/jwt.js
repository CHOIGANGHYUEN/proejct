const jwt = require("jsonwebtoken");

const { SERVER_SECRET } = "1234";
async function makeRefreshToken(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.sign(value, SERVER_SECRET);
  });
}
async function signJWT(value) {
  return new Promise((resolve, reject) => {
    console.log(value);
    // TODO: complete here
    jwt.sign(value, SERVER_SECRET, (err, encoded) => {
      if (err) {
        console.log(err);
        reject(err);
      } else resolve(encoded);
    });
  });
}

async function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    // TODO: complete here
    jwt.verify(token, SERVER_SECRET, (err, value) => {
      if (err) reject("여기서 발생한 문제 ", err);
      else resolve(value);
    });
  });
}

module.exports = {
  signJWT,
  verifyJWT,
};
