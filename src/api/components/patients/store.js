const Pacientes = require('../../../db/models/index').pacientes;

const createPatient = async (data) => {
    return await Pacientes.create({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        weight: data.weight,
        height: data.height,
        age: data.age,
        phone: data.phone,
        blood: data.blood
    });
};

const updatePatient = async (data) => {
    return await Pacientes.update(
        {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            weight: data.weight,
            height: data.height,
            age: data.age,
            phone: data.phone,
            blood: data.blood
        },
        {
            where: { id: data.id },
            returning: true,
            plain: true
        }
    );
};

const getPatientById = async (id) => {
    return await Pacientes.findOne({
        where: {
            id: id
        }
    });
};

const getPatientByPhone = async (phone) => {
    return await Pacientes.findOne({
        where: {
            phone: phone
        }
    });
};

module.exports = {
    patientCreate: createPatient,
    patientUpdate: updatePatient,
    patientById: getPatientById,
    PatientByPhone: getPatientByPhone
};