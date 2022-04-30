const express = require("express");
const router = express.Router();
const {
  loginSchema,
} = require("../../../utils/validations/schemas/doctors.schema"); // eslint-disable-line
const validationHandler = require("../../../utils/middlewares/validationHandler");
const controller = require("./controller");
const createJwt = require("../../../utils/createJwt");
const passport = require("passport");
const { isLoggedIn ,isNotLoggedIn} = require("../../../ssr/lib/auth");

router.get("/" ,isNotLoggedIn,async (req, res, next) => {
  try {
    res.redirect("/home");
  } catch (error) {
    next(error);
  }
});

router.get("/home",isNotLoggedIn, async (req, res, next) => {
  try {
    res.render("home/home");
  } catch (error) {
    next(error);
  }
});

router.get("/login",isNotLoggedIn, async (req, res, next) => {
  try {
    res.render("home/login");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",isNotLoggedIn,
  validationHandler(loginSchema),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      
      const doctor = {
        username,
        password,
      };
      passport.authenticate("local.login", {
        successRedirect: "/api/doctor",
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res, next);
      const doctorInfo = await controller.getDoctorUser(doctor);
      //console.log( req.session);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/logout',isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect('/login')
  })
});

module.exports = router;
