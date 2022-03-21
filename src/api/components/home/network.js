const express = require('express');
const router = express.Router();
const {
    loginSchema
} = require('../../../utils/validations/schemas/doctors.schema'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');
const createJwt = require('../../../utils/createJwt');

router.get('/', (req, res, next) => {
    try {
        res.redirect('/home');
    } catch (error) {
        next(error);
    }
});

router.get('/home', (req, res, next) => {
    try {
        res.status(200).json({
            Message: 'This is the home page'
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', validationHandler(loginSchema) ,async (req, res, next) => {
    try {
        const {
            username,
            password
        } = req.body;
        const doctor = {
            username,
            password,
        };
        const doctorInfo = await controller.getDoctorUser(doctor);
        const jwtCreated = createJwt.createToken(doctorInfo);
        const refreshJwtCreated = createJwt.refreshToken(doctorInfo);

        res.json({
            Message: 'Logging Success',
            accessToken: jwtCreated,
            refreshToken: refreshJwtCreated
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
