const store = require('./store');

const consultCreation = async (data) => {
    return await store.consultCreate(data);
};

const consultUpdate = async (data) => {
    return await store.consultUpdate(data);
};

const getConsultById = async (id) => {
    return store.consultById(id);
};

const getConsultByDate = async (dateVisit) => {
    return store.consultByDate(dateVisit);
};

module.exports = {
    consultCreation,
    consultUpdate,
    getConsultById,
    getConsultByDate
};