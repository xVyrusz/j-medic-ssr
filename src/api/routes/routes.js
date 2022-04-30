const doctorRoutes = require('../components/doctors/network');
const homeRoutes = require('../components/home/network');
const patientRoutes = require('../components/patients/network');
const consultRoutes = require('../components/consults/network');
const appointmentRoutes = require('../components/appointment/network');

const routes = (app) => {
    app.use('/api/doctor', doctorRoutes);
    app.use('/', homeRoutes);
    app.use('/api/patients', patientRoutes);
    app.use('/api/consults', consultRoutes);
    app.use('/api/appointment', appointmentRoutes);
};

module.exports = routes;