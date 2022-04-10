const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, passport, done) => {
    console.log(req.body);
    console.log(username);
    console.log(passport);
}));

// passport.serializeUser((usr, done) => {

// });