module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("islogged");
      req.session.isAuthenticated = true;
      res.locals.isAuthenticated = true;
      res.locals.user = req.user;
      return next();
    }
    return res.redirect('/login');
  },
  isNotLoggedIn(req, res, next) {
    if (req.isAuthenticated() == false) {
      console.log(req.isAuthenticated());
      //console.log( req.session);
      return next();
    } else {
      console.log("else de isnotlogged");
      return res.redirect('/api/doctor');
    }
  }
};
