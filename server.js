const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container');

// The Promise.resolve(value) method returns a Promise object that is resolved with the given value.
// If the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable,
// adopting its eventual state; if the value was a promise, that object becomes the result of the call
// to Promise.resolve; otherwise the returned promise will be fulfilled with the value.

container.resolve(function(users, _, admin) {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    'mongodb://Prakhar:hexadecimalA001@ds111618.mlab.com:11618/sociofuss'
    // { useMongoClient: true }
  );

  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(8015, function() {
      console.log('Listening on port 8015');
    });

    ConfigureExpress(app);
    // setting up router
    const router = require('express-promise-router')();
    users.SetRouting(router);
    admin.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app) {
    require('./passport/passport-local');
    require('./passport/passport-facebook');
    require('./passport/passport-google');

    app.use(express.static('public')); // now express app can access any static files in the structure unded public
    app.use(cookieParser());
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(validator());
    app.use(
      session({
        secret: 'hsiuvhlksjvnalsvflsjkbfabvah',
        resave: true,
        saveInitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.locals._ = _;
  }
});
