'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class pacientes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    pacientes.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        gender: DataTypes.STRING,
        height: DataTypes.FLOAT,
        weight: DataTypes.FLOAT,
        age: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        blood: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'pacientes',
        timestamps: false
    });
    return pacientes;
};