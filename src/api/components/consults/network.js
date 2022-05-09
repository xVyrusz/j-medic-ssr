const express = require('express');
const router = express.Router();
const {
  createConsultSchema,
  updateConsultSchema,
  consultIdSchema,
  dateSchema,
  dateUpdateSchema
} = require('../../../utils/validations/schemas/consults.schema'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');
const checkJwt = require('../../../utils/middlewares/auth/checkJwt');
const checkRole = require('../../../utils/middlewares/auth/checkRole');
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
    res.render('consults/add');
  } catch (error) {
    next(error);
  }
});

router.post('/add', isLoggedIn, validationHandler(createConsultSchema), async (req, res, next) => {
  const {
    dateVisit,
    nameReason,
    testMade,
    diagnosis,
    treatment,
    idDoctor,
    idPatient
  } = req.body;
  const newConsult = {
    dateVisit,
    nameReason,
    testMade,
    diagnosis,
    treatment,
    idDoctor,
    idPatient
  };
  try {
    const consults = await controller.consultCreation(newConsult);
    if (consults) {
      const consult = consults.dataValues;
      console.log(consult);
      res.render('consults/listaddGet', { consult });
    } 
  } catch (error) {
    next(error);
  }
}
);

router.get('/update', isLoggedIn, (req, res, next) => {
  try {
    res.render('consults/update');
  } catch (error) {
    next(error);
  }
});

router.post('/update', isLoggedIn, validationHandler(updateConsultSchema), async (req, res, next) => {
  const {
    id,
    dateVisit,
    nameReason,
    testMade,
    diagnosis,
    treatment,
    idDoctor,
    idPatient
  } = req.body;
  const updateConsult = {
    id,
    dateVisit,
    nameReason,
    testMade,
    diagnosis,
    treatment,
    idDoctor,
    idPatient
  };
  try {
    const consult = await controller.consultUpdate(updateConsult);
    res.render('consults/update');
  } catch (error) {
    next(error);
  }
});

router.get('/list', isLoggedIn, async (req, res, next) => {
  try {
    res.render('consults/list');
  } catch (error) {
    next(error);
  }
});

router.get('/list/id', isLoggedIn, async (req, res, next) => {
  try {
    res.render('consults/listId');
  } catch (error) {
    next(error);
  }
});

router.post('/list/id', isLoggedIn, validationHandler({ id: consultIdSchema }), async (req, res, next) => {
  const { id } = req.body;

  try {
    const consults = await controller.getConsultById(id);
    if (consults) {
      const consult = consults.dataValues;
      console.log(consult);
      res.render('consults/listIdGet', { consult });
    } else {
      res.render('consults/dontExist');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/list/date', isLoggedIn, async (req, res, next) => {
  try {
    res.render('consults/listDate');
  } catch (error) {
    next(error);
  }
});

router.post('/list/date', isLoggedIn, validationHandler({ dateVisit: dateUpdateSchema }), async (req, res, next) => {
  const { dateVisit } = req.body;

  try {
    const consults = await controller.getConsultByDate(dateVisit);
    if (consults) {
      const consult = consults.dataValues;
      console.log(consult);
      res.render('consults/listDateGet', { consult });
    } else {
      res.render('consults/dontExist');
    }
  } catch (error) {
    next(error);
  }
});


router.post('/list/up', isLoggedIn, validationHandler({ id: consultIdSchema }), async (req, res, next) => {
  const { id } = req.body;

  try {
    const consults = await controller.getConsultById(id);
    if (consults) {
      const consult = consults.dataValues;
      console.log(consult);
      res.render('consults/listUpdateGet', { consult });
    } else {
      res.render('consults/dontExist');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;