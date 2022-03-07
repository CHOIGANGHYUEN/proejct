var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rkdgus1234!?",
  database: "my_db",
  multipleStatements: true,
});

module.exports = db;
