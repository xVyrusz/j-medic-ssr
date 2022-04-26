const express = require("express");
const router = express.Router();
const {
  loginSchema,
} = require("../../../utils/validations/schemas/doctors.schema"); // eslint-disable-line
const validationHandler = require("../../../utils/middlewares/validationHandler");
const controller = require("./controller");
const createJwt = require("../../../utils/createJwt");
const passport = require("passport");

router.get("/", async (req, res, next) => {
  try {
    res.redirect("/home");
  } catch (error) {
    next(error);
  }
});

router.get("/home", async (req, res, next) => {
  try {
    res.render("home/home");
  } catch (error) {
    next(error);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    res.render("home/login");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
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
    } catch (error) {
      next(error);
    }
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login') // will always fire after session is destroyed
  })
});

module.exports = router;
