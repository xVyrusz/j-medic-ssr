const store = require('./store');

const appointmentCreation = async (data) => {
    return await store.citaCreate(data);
};

const appointmentUpdate = async (data) => {
    return await store.citaUpdate(data);
};

const getCitaById = async (id) => {
    return store.citaById(id);
};

const getCitaByDate = async (date) => {
    return store.citaByDate(date);
};

module.exports = {
    appointmentCreation,
    appointmentUpdate,
    getCitaById,
    getCitaByDate
};