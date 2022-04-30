const joi = require('joi');

const appointmentIdSchema = joi.number();
const dateSchema = joi.date().greater('now');
const dateUpdateSchema = joi.date();
const IdPatientSchema = joi.number();
const IdDoctorSchema = joi.number();



const createAppointmentSchema = {
    date: dateSchema.required(),
    idPatient: IdPatientSchema.required(),
    idDoctor: IdDoctorSchema.required()
};
const updateAppointmentSchema = {
    id: appointmentIdSchema,
    date: dateUpdateSchema,
    idPatient: IdPatientSchema,
    idDoctor: IdDoctorSchema
};
module.exports = {
    createAppointmentSchema,
    updateAppointmentSchema,
    appointmentIdSchema,
    dateSchema
};