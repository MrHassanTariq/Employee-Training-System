var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeetrainingsystem"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("You are now connected...");
});

// class Database {
//   constructor() {
//     this.connection = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "nodejs_login"
//     });
//   }
//   query(sql, args) {
//     return new Promise((resolve, reject) => {
//       this.connection.query(sql, args, (err, rows) => {
//         if (err) return reject(err);
//         resolve(rows);
//       });
//     });
//   }
//   close() {
//     return new Promise((resolve, reject) => {
//       this.connection.end(err => {
//         if (err) return reject(err);
//         resolve();
//       });
//     });
//   }
// }

module.exports = connection;
