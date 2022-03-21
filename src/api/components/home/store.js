const Medicos = require('../../../db/models/index').medicos;

const getDoctorUser = async (username) => {
    return await Medicos.findOne({
        where: {
            username: username
        }
    });
};

module.exports = {
    doctorByUser: getDoctorUser,
};