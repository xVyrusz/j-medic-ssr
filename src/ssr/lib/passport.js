const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const store = require("../../api/components/doctors/store");
const bcrypt = require("bcryptjs");

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const doctor = await store.doctorByUser(username);
        if (!doctor) done(null, false, req.flash('message', ''));

        const { dataValues } = doctor;
        const passwordMatched = await bcrypt.compare(
          password,
          dataValues.password
        );
        if (!passwordMatched) {
          done(null, false, req.flash('message', ''));
        } else {
          done(null, doctor, req.flash('success', ''));
        }
      } catch (error) {
        return done(null, false)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const doctor = await store.doctorById(id);
  done(null, doctor.id);
});
