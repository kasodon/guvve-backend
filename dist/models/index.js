"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

require('dotenv').config();

var dbURL = process.env.DB_CONNECT;

var connectDB = function connectDB() {
  console.log("Database url: " + dbURL.slice(10, 20) + '...');
  return _mongoose["default"].connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

exports.connectDB = connectDB;
var models = {
  User: _User["default"]
};
var _default = models;
exports["default"] = _default;