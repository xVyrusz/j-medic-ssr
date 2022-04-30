'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class cita extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    cita.init({
        date: DataTypes.DATE,
        idPatient: DataTypes.FLOAT,
        idDoctor: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'cita',
        timestamps: false
    });
    return cita;
};