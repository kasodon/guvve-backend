"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = require("./models");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

// Import environment variable and sensitive data from ../.env
// Import this before other files for them to access these variables
// Allow cross-origin request
// Other imports
var app = (0, _express["default"])(); // Use the passport Middleware

app.use(_passport["default"].initialize()); // Bring in the Passport Strategy

require('./config/passport.js')(_passport["default"]);

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/users', _routes["default"].users);
(0, _models.connectDB)().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Connected to Database");
          app.listen(process.env.PORT, function () {
            return console.log('App running on port ' + process.env.PORT);
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));