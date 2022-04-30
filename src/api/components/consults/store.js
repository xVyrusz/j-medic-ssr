
const Consulta = require('../../../db/models/index').consulta;

const createConsult = async (data) => {
  return await Consulta.create({
    dateVisit: data.dateVisit,
    nameReason: data.nameReason,
    testMade: data.testMade,
    diagnosis: data.diagnosis,
    treatment: data.treatment,
    idDoctor: data.idDoctor,
    idPatient: data.idPatient,
  });
};

const updateConsult = async (data) => {
  return await Consulta.update(
    {
      dateVisit: data.dateVisit,
      nameReason: data.nameReason,
      testMade: data.testMade,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      idDoctor: data.idDoctor,
      idPatient: data.idPatient,
    },
    {
      where: { id: data.id },
      returning: true,
      plain: true
    }
  );
};

const getConsultById = async (id) => {
  return await Consulta.findOne({
    where: {
      id: id
    }
  });
};

const getConsultByDate = async (dateVisit) => {
  return await Consulta.findOne({
    where: {
      dateVisit: dateVisit
    }
  });
};

module.exports = {
  consultCreate: createConsult,
  consultUpdate: updateConsult,
  consultById: getConsultById,
  consultByDate: getConsultByDate
};