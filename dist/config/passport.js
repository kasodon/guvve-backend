"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _models = _interopRequireDefault(require("../models"));

var JwtStrategy = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;

var mongoose = require('mongoose');

require('dotenv').config();

var key = process.env.TOKEN_SECRET;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    _models["default"].User.findById(jwt_payload._id).then(function (user) {
      if (user) return done(null, user);
      return done(null, false);
    })["catch"](function (err) {
      return console.log(err);
    });
  }));
};