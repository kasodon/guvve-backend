"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("../models/User"));

var key = require('../config/keys').secret;

var router = (0, _express.Router)();
/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */

router.post('/register', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      username = _req$body.username,
      email = _req$body.email,
      role = _req$body.role,
      password = _req$body.password,
      confirm_password = _req$body.confirm_password;

  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match."
    });
  } // Check for the unique Username


  _User["default"].findOne({
    username: username
  }).then(function (user) {
    if (user) {
      return res.status(400).json({
        msg: "Username is already taken."
      });
    }
  }); // Check for the Unique Email


  _User["default"].findOne({
    email: email
  }).then(function (user) {
    if (user) {
      return res.status(400).json({
        msg: "Email is already registred. Did you forgot your password."
      });
    }
  }); // The data is valid and new we can register the user


  var newUser = new _User["default"]({
    name: name,
    username: username,
    password: password,
    email: email,
    role: role
  }); // Hash the password

  _bcryptjs["default"].genSalt(10, function (err, salt) {
    _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(function (user) {
        return res.status(201).json({
          success: true,
          msg: "Hurry! User is now registered."
        });
      });
    });
  });
});
router.post('/login', function (req, res) {
  _User["default"].findOne({
    username: req.body.username
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        msg: "Username is not found.",
        success: false
      });
    } // If there is user we are now going to compare the password


    _bcryptjs["default"].compare(req.body.password, user.password).then(function (isMatch) {
      if (isMatch) {
        // User's password is correct and we need to send the JSON Token for that user
        var payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email
        };

        _jsonwebtoken["default"].sign(payload, key, {
          expiresIn: 604800
        }, function (err, token) {
          res.status(200).json({
            success: true,
            token: "Bearer ".concat(token),
            user: user,
            msg: "Hurry! You are now logged in."
          });
        });
      } else {
        return res.status(401).json({
          msg: "Incorrect password.",
          success: false
        });
      }
    });
  });
});
/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */

router.get('/profile', _passport["default"].authenticate('jwt', {
  session: false
}), function (req, res) {
  return res.json({
    user: req.user
  });
});
module.exports = router;