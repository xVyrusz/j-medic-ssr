const bcrypt = require('bcryptjs');
const store = require('./store');
const boom = require('@hapi/boom');

const getDoctorUser = async (user) => {
    try {
        const doctor = await store.doctorByUser(user.username);
        if (!doctor) throw boom.badData('Username or password are invalid');
        const { dataValues } = doctor;
        const passwordMatched = await bcrypt.compare(
            user.password,
            dataValues.password
        );
        if (!passwordMatched)
            throw boom.badData('Username or password are invalid');

        return {
            id: dataValues.id,
            username: dataValues.username,
            license: dataValues.license
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getDoctorUser
};
