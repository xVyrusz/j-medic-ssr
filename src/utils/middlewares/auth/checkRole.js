const boom = require('@hapi/boom');

const checkIdRole = (req, res, next) => {
    const user = req.userData.role;
    if (role === 'admin') {
        next();
    }else {
        throw ( boom.unauthorized());
    }
};

module.exports = checkIdRole;