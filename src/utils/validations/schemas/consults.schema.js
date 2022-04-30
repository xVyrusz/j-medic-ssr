const joi = require('joi');

const consultIdSchema = joi.number();
const dateSchema = joi.date().greater('now');
const dateUpdateSchema = joi.date();
const nameReasonSchema = joi.string().max(250);
const testMadeSchema = joi.string().max(250);
const diagnosisSchema = joi.string().max(250);
const treatmentSchema = joi.string().max(250);
const IdDoctorSchema = joi.number();
const IdPatientSchema = joi.number();



const createConsultSchema = {
  dateVisit: dateSchema.required(),
  nameReason: nameReasonSchema.required(),
  testMade: testMadeSchema.required(),
  diagnosis: diagnosisSchema.required(),
  treatment: treatmentSchema.required(),
  idDoctor: IdDoctorSchema.required(),
  idPatient: IdPatientSchema.required()
};
const updateConsultSchema = {
  id: consultIdSchema,
  dateVisit: dateUpdateSchema,
  nameReason: nameReasonSchema,
  testMade: testMadeSchema,
  diagnosis: diagnosisSchema,
  treatment: treatmentSchema,
  idDoctor: IdDoctorSchema,
  idPatient: IdPatientSchema
};
module.exports = {
  createConsultSchema,
  updateConsultSchema,
  consultIdSchema,
  dateSchema,
  dateUpdateSchema
};