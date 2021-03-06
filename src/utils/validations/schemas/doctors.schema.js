const joi = require('joi');

const baseValidString = joi.string().min(3).max(100).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/);
const doctorIdSchema = joi.number();
const firstNameSchema = baseValidString;
const lastNameSchema = baseValidString;
const usernameSchema =joi.string().min(3).max(100);
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
  id:doctorIdSchema,
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