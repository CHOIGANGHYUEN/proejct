const mysql = require("mysql");
const password = require("../dotenv");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password.mySqlPassword,
  database: "my_db",
  multipleStatements: true,
});
connection.connect();
module.exports = connection;
