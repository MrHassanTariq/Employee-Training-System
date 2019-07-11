var express = require("express");
var roles = express.Router();
const cors = require("cors");

const models = require("../models");
roles.use(cors());

module.exports = roles;
