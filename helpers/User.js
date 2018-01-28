'use strict';

module.exports = function() {
  return {
    SignUpValidation: (req, res, next) => {
      req.checkBody('username', 'Username is required to register').notEmpty();
      req
        .checkBody('username', 'Username should be at least 5 characters long')
        .isLength({ min: 5 });
      req.checkBody('email', 'E-mail is required to register').notEmpty();
      req.checkBody('email', 'E-mail is invalid').isEmail();
      req.checkBody('password', 'Password is required to register').notEmpty();
      req
        .checkBody('password', 'Password must not be less than 5 characters')
        .isLength({ min: 5 });

      req
        .getValidationResult()
        .then(result => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          res.redirect('/signup');
        })
        .catch(err => {
          return next();
        });
    },

    LoginValidation: (req, res, next) => {
      req.checkBody('email', 'E-mail is required to register').notEmpty();
      req.checkBody('email', 'E-mail is invalid').isEmail();
      req.checkBody('password', 'Password is required to register').notEmpty();

      req
        .getValidationResult()
        .then(result => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          res.redirect('/');
        })
        .catch(err => {
          return next();
        });
    }
  };
};
