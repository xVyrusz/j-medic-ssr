const express = require('express');
const router = express.Router();
const {
  createPatientSchema,
  updatePatientSchema,
  patientIdSchema,
  phoneSchema
} = require('../../../utils/validations/schemas/patients.schema'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');
const checkJwt = require('../../../utils/middlewares/auth/checkJwt');
const { isLoggedIn } = require("../../../ssr/lib/auth");

router.get('/', isLoggedIn, (req, res, next) => {
  try {
    res.render('doctors/menu');
  } catch (error) {
    next(error);
  }
});

router.get('/add', isLoggedIn, (req, res, next) => {
  try {
    res.render('patients/add');
  } catch (error) {
    next(error);
  }
});

router.post('/add', isLoggedIn, validationHandler(createPatientSchema), async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    weight,
    height,
    age,
    phone,
    blood
  } = req.body;
  const newPatient = {
    firstName,
    lastName,
    gender,
    weight,
    height,
    age,
    phone,
    blood
  };
  try {
    const patient = await controller.patientCreation(newPatient);
    res.status(201).json({
      Message: 'Created',
      Patient: {
        "id": patient.id,
        "firstName": patient.firstName,
        "lastName": patient.lastName,
        "gender": patient.gender,
        "weight": patient.weight,
        "height": patient.height,
        "age": patient.age,
        "phone": patient.phone,
        "blood": patient.blood
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/update', isLoggedIn, (req, res, next) => {
  try {
    res.render('patients/update');
  } catch (error) {
    next(error);
  }
});

router.post('/update', isLoggedIn, validationHandler(updatePatientSchema), async (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    gender,
    weight,
    height,
    age,
    phone,
    blood
  } = req.body;
  const updatePatient = {
    id,
    firstName,
    lastName,
    gender,
    weight,
    height,
    age,
    phone,
    blood
  };
  try {
    const patient = await controller.patientUpdate(updatePatient);
    res.status(201).json({
      Message: 'Updated',
      Patient: {
        "id": patient.id,
        "firstName": patient.firstName,
        "lastName": patient.lastName,
        "gender": patient.gender,
        "weight": patient.weight,
        "height": patient.height,
        "age": patient.age,
        "phone": patient.phone,
        "blood": patient.blood
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/list', isLoggedIn, async (req, res, next) => {
  try {
    res.render('patients/list');
  } catch (error) {
    next(error);
  }
});

router.get('/list/id', isLoggedIn, async (req, res, next) => {
  try {
    res.render('patients/listId');
  } catch (error) {
    next(error);
  }
});

router.post('/list/id', isLoggedIn, validationHandler({ id: patientIdSchema }), async (req, res, next) => {
  const { id } = req.body;

  try {
    const patients = await controller.getPatientById(id);
    if (patients) {
      const patient = patients.dataValues;
      console.log(patient);
      res.render('patients/listIdGet', { patient });
    } else {
      res.render('patients/dontExist');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/list/phone', isLoggedIn, async (req, res, next) => {
  try {
    res.render('patients/listPhone');
  } catch (error) {
    next(error);
  }
});

router.post('/list/phone', isLoggedIn, validationHandler({ phone: phoneSchema }), async (req, res, next) => {
  const { phone } = req.body;

  try {
    const patients = await controller.getPatientByPhone(phone);
    if (patients) {
      const patient = patients.dataValues;
      console.log(patient);
      res.render('patients/listPhoneGet', { patient });
    } else {
      res.render('patients/dontExistPhone');
    }
  } catch (error) {
    next(error);
  }
});


router.post('/list/up', isLoggedIn, validationHandler({ id: patientIdSchema }), async (req, res, next) => {
  const { id } = req.body;

  try {
    const patients = await controller.getPatientById(id);
    if (patients) {
      const patient = patients.dataValues;
      console.log(patient);
      res.render('patients/listUpdateGet', { patient });
    } else {
      res.render('patients/dontExist');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;