const bcrypt = require('bcryptjs');
const store = require('./store');
const boom = require('@hapi/boom');
const saltRounds = 10;

const doctorCreation = async (data) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(data.password, saltRounds, (err, hash) => {
      if (err) reject('Error hashing password');
      resolve(hash);
    });
  });

  const objUser = await store.doctorByUser(data.username);
  const objCedula = await store.doctorByLicense(data.license);

  if (objUser != null) {
    // const user = JSON.stringify(Object.values(JSON.parse(JSON.stringify(objUser))));
    // console.log(user);
    throw boom.conflict('User already exist');
  } else {
    if (objCedula != null) {
      // const cedula = JSON.stringify(Object.values(JSON.parse(JSON.stringify(objCedula))));
      // console.log(cedula);
      throw boom.conflict('License already exist');
    } else {
      data.password = hashedPassword;
      return await store.doctorCreate(data);
    }
  }
};

const doctorUpdate = async (data) => {
  return await store.doctorUpdate(data);
};

const getDoctorCedula = async (id) => {
  return store.doctorByLicense(id);
};

const getDoctorId = async (id) => {
  return store.doctorById(id);
};

module.exports = {
  doctorCreation,
  doctorUpdate,
  getDoctorCedula,
  getDoctorId
};