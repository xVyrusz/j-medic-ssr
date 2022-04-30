const Cita = require('../../../db/models/index').cita;

const createCita = async (data) => {
    return await Cita.create({
        date: data.date,
        idPatient: data.idPatient,
        idDoctor: data.idDoctor
    });
};

const updateCita = async (data) => {
    return await Cita.update(
        {
            date: data.date,
            idPatient: data.idPatient,
            idDoctor: data.idDoctor
        },
        {
            where: { id: data.id },
            returning: true,
            plain: true
        }
    );
};

const getCitaById = async (id) => {
    return await Cita.findOne({
        where: {
            id: id
        }
    });
};

const getCitaByDate = async (date) => {
    return await Cita.findOne({
        where: {
            date: date
        }
    });
};

module.exports = {
    citaCreate: createCita,
    citaUpdate: updateCita,
    citaById: getCitaById,
    citaByDate: getCitaByDate
};