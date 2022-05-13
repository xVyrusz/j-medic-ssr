const express = require("express");
const router = express.Router();
const {
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
  citaIdSchema,
  dateSchema,
  dateUpdateSchema,
} = require("../../../utils/validations/schemas/appointment.schema"); // eslint-disable-line
const validationHandler = require("../../../utils/middlewares/validationHandler");
const controller = require("./controller");
const controllerDoctor = require("../doctors/controller");
const controllerPatients = require("../patients/controller");
const checkJwt = require("../../../utils/middlewares/auth/checkJwt");
const checkRole = require("../../../utils/middlewares/auth/checkRole");
const { isLoggedIn } = require("../../../ssr/lib/auth");

router.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.render("doctors/menu");
  } catch (error) {
    next(error);
  }
});

router.get("/add", isLoggedIn, (req, res, next) => {
  try {
    res.render("appointment/add");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/add",
  isLoggedIn,
  validationHandler(createAppointmentSchema),
  async (req, res, next) => {
    const { date, idDoctor, idPatient } = req.body;
    const newAppointment = {
      date,
      idDoctor,
      idPatient,
    };

    try {
      const existDoctor = await controllerDoctor.getDoctorId(
        newAppointment.idDoctor
      );
      const existPatient = await controllerPatients.getPatientById(newAppointment.idPatient);
      console.log(existPatient);
      const exist = await controller.getCitaByDate(newAppointment.date);
      if (existDoctor && existPatient) {
        if (!exist) {
          const appointments = await controller.appointmentCreation(
            newAppointment
          );
          if (appointments) {
            const appointment = appointments.dataValues;
            console.log(appointment);
            res.render("appointment/listaddGet", { appointment });
          }
        } else {
          res.render("home/errores");
        }
      } else {
        res.render("home/errores");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/update", isLoggedIn, (req, res, next) => {
  try {
    res.render("appointment/update");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/update",
  isLoggedIn,
  validationHandler(updateAppointmentSchema),
  async (req, res, next) => {
    const { id, date, idPatient } = req.body;
    const updateAppointment = {
      id,
      date,
      idPatient,
    };
    try {
      const cita = await controller.appointmentUpdate(updateAppointment);
      res.render("appointment/update");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/list", isLoggedIn, async (req, res, next) => {
  try {
    res.render("appointment/list");
  } catch (error) {
    next(error);
  }
});

router.get("/list/id", async (req, res, next) => {
  try {
    res.render("appointment/listId");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/list/id",
  isLoggedIn,
  validationHandler({ id: appointmentIdSchema }),
  async (req, res, next) => {
    const { id } = req.body;

    try {
      const appointments = await controller.getCitaById(id);
      if (appointments) {
        const appointment = appointments.dataValues;
        console.log(appointment);
        res.render("appointment/listIdGet", { appointment });
      } else {
        res.render("appointment/dontExist");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/list/date", isLoggedIn, async (req, res, next) => {
  try {
    res.render("appointment/listDate");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/list/date",
  isLoggedIn,
  validationHandler({ date: dateSchema }),
  async (req, res, next) => {
    const { date } = req.body;

    try {
      const appointments = await controller.getCitaByDate(date);
      if (appointments) {
        const appointment = appointments.dataValues;
        console.log(appointment);
        res.render("appointment/listDateGet", { appointment });
      } else {
        res.render("appointment/dontExist");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/list/up",
  isLoggedIn,
  validationHandler({ date: dateSchema }),
  async (req, res, next) => {
    const { date } = req.body;

    try {
      const appointments = await controller.getCitaByDate(date);
      if (appointments) {
        const appointment = appointments.dataValues;
        console.log(appointment);
        res.render("appointment/listUpdateGet", { appointment });
      } else {
        res.render("appointment/dontExist");
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
