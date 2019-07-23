var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeetrainingsystem",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.log(
      "Error while establishing the connection. Error Number:",
      err.errno
    );
  } else {
    console.log("You are now connected...");
  }
});

module.exports = connection;
