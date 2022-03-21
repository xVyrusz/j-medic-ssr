const doctorRoutes = require('../components/doctors/network');
const homeRoutes = require('../components/home/network');

const routes = (app) => {
    app.use('/api/doctor', doctorRoutes);
    app.use('/', homeRoutes);
};

module.exports = routes;