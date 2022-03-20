const doctorRoutes = require('../components/doctors/network');

const routes = (app) => {
    app.use('/api/doctor', doctorRoutes);
};

module.exports = routes;