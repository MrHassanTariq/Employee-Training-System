var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_login"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connectiuon successful");
  // console.log("You are now connected...");
});

module.exports = connection;
