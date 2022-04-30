const express = require("express");
const router = express.Router();
const {
  createDoctorSchema,
  updateDoctorSchema,
  cedulaSchema
} = require("../../../utils/validations/schemas/doctors.schema"); // eslint-disable-line
const validationHandler = require("../../../utils/middlewares/validationHandler");
const controller = require("./controller");
const checkJwt = require("../../../utils/middlewares/auth/checkJwt");
const checkRole = require("../../../utils/middlewares/auth/checkRole");
const { isLoggedIn ,isNotLoggedIn} = require("../../../ssr/lib/auth");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.render("doctors/menu");
  } catch (error) {
    next(error);
  }
});

router.get("/add", isLoggedIn, async (req, res, next) => {
  try {
    res.render("doctors/add");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/add",
  isLoggedIn,isNotLoggedIn,
  validationHandler(createDoctorSchema),
  async (req, res, next) => {
    const { firstName, lastName, username, password, license, phone } =
      req.body;
    const newDoctor = {
      firstName,
      lastName,
      username,
      password,
      license,
      phone,
    };
    try {
      const doctor = await controller.doctorCreation(newDoctor);
      res.status(201).json({
        Message: "Created",
        Doctor: {
          id: doctor.id,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          username: doctor.username,
          license: doctor.license,
          phone: doctor.phone,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/update", isLoggedIn, async (req, res, next) => {
  try {
    res.render("doctors/update");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/update",
  isLoggedIn,
  validationHandler(updateDoctorSchema),
  async (req, res, next) => {
    const { id, firstName, lastName, username, password, license, phone } =
      req.body;
    const updateDoctor = {
      id,
      firstName,
      lastName,
      username,
      password,
      license,
      phone,
    };
    try {
      const doctor = await controller.doctorUpdate(updateDoctor);
      res.status(201).json({
        Message: "Updated",
        Doctor: {
          id: doctor.id,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          username: doctor.username,
          license: doctor.license,
          phone: doctor.phone,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/list', isLoggedIn, async (req, res, next) => {
  try {
      res.render('doctors/list');
  } catch (error) {
      next(error);
  }
});

router.get('/list/id', isLoggedIn, async (req, res, next) => {
  try {
      res.render('doctors/listId');
  } catch (error) {
      next(error);
  }
});

router.post('/list/id', isLoggedIn, validationHandler({ id: cedulaSchema }), async (req, res, next) => {
  const { id } = req.body;

  try {
      const doctors = await controller.getDoctorCedula(id);
      if (doctors) {
          const doctor = doctors.dataValues;
          console.log(doctor);
          res.render('doctors/listIdGet', { doctor });
      } else {
          res.render('doctors/dontExist');
      }
  } catch (error) {
      next(error);
  }
});

router.post('/list/up', isLoggedIn, validationHandler({ id: cedulaSchema }), async (req, res, next) => {
  const { id } = req.body;

  try {
      const doctors = await controller.getDoctorCedula(id);
      if (doctors) {
          const doctor = doctors.dataValues;
          console.log(doctor);
          res.render('doctors/listUpdateGet', { doctor });
      } else {
          res.render('doctors/dontExist');
      }
  } catch (error) {
      next(error);
  }
});


module.exports = router;
