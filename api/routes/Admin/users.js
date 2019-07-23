var express = require("express");
var users = express.Router();
const cors = require("cors");

// const models = require("../models");
const connection = require("../../database/db");
users.use(cors());

users.get("/getDetails", (req, res, next) => {
  connection.query("SELECT count(*) AS NumberOfUsers FROM user", function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
    } else {
      var NumberOfUsers = result[0].NumberOfUsers;
      connection.query(
        "Select COUNT(*) as NumberOfManagers FROM User LEFT JOIN Role ON user.roleId = Role.id WHERE Role.name =?",
        ["Manager"],
        function(err, result) {
          if (err) {
            res.json({ err: true });
          } else {
            var NumberOfManagers = result[0].NumberOfManagers;
            connection.query(
              "Select COUNT(*) as NumberOfTrainees FROM User LEFT JOIN Role ON user.roleId = Role.id WHERE Role.name =?",
              ["Trainee"],
              function(err, result) {
                if (err) {
                  res.json({ err: true });
                } else {
                  var NumberOfTrainees = result[0].NumberOfTrainees;
                  connection.query(
                    "SELECT COUNT(*) AS NumberOfCourses FROM Course",
                    function(err, result) {
                      if (err) {
                        res.json({ err: true });
                      } else {
                        var NumberOfCourses = result[0].NumberOfCourses;
                        res.json({
                          Users: NumberOfUsers,
                          Managers: NumberOfManagers,
                          Courses: NumberOfCourses,
                          Trainees: NumberOfTrainees
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

users.get("/getManagers", (req, res, next) => {
  connection.query(
    "SELECT * FROM User LEFT JOIN Role ON User.roleId = Role.id WHERE Role.name =?",
    ["Manager"],
    function(err, result) {
      if (err) {
        // res.json({ err: true });
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

users.get("/getTrainees", (req, res, next) => {
  connection.query(
    "SELECT * FROM User LEFT JOIN Role ON User.roleId = Role.id WHERE Role.name =?",
    ["Trainee"],
    function(err, result) {
      if (err) {
        // res.json({ err: true });
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = users;
