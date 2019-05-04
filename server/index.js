'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser'); 
const cors = require('cors');
const socketIO = require('../handlers/socketIO');
const http = require('http');
const db = require('../configs/db');
const jwt = require('express-jwt');

module.exports = function() {
  let server = express(),
    create,
    start,
    httpServer;

  create = function(config, db) {
    httpServer = http.Server(server);
    socketIO.configure(httpServer);
    let routes = require('./routes');

    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    // Returns middleware that parses json
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    mongoose.connect(db.database, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    server.use(jwt({ secret: db.secret }).unless({path: ['/api/v1/register', '/api/v1/login']}));
    // Set up routes
    routes.init(server);
  };

  start = function() {
    let hostname = server.get('hostname'),
      port = server.get('port');

    httpServer.listen(port, function () {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });
  };

  return {
    create: create,
    start: start
  };
};
