const joi = require('joi');

const baseValidString = joi.string().min(3).max(100);
const doctorIdSchema = joi.number();
const firstNameSchema = baseValidString;
const lastNameSchema = baseValidString;
const usernameSchema = baseValidString;
const passwordSchema = joi
    .string()
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .message(
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );
const cedulaSchema = joi
    .string()
    .length(8)
    .regex(/^[0-9]+$/)
    .message('Cedula Invalida.');
const phoneSchema = joi
    .string()
    .min(8)
    .max(20)
    .regex(/^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/)
    .message('Invalid phone number.');

const createDoctorSchema = {
    firstName: firstNameSchema.required(),
    lastName: lastNameSchema.required(),
    username: usernameSchema.required(),
    password: passwordSchema.required(),
    license: cedulaSchema.required(),
    phone: phoneSchema.required(),
};

const updateDoctorSchema = {
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    username: usernameSchema,
    password: passwordSchema,
    license: cedulaSchema,
    phone: phoneSchema,
};

const loginSchema = {
    username: usernameSchema.required(),
    password: passwordSchema.required()
};

module.exports = {
    createDoctorSchema,
    updateDoctorSchema,
    loginSchema,
    cedulaSchema
};