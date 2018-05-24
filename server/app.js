var express = require('express');
var app = express();

var UserController = require('./user/UserController');
app.use('/user', UserController);

module.exports = app;
