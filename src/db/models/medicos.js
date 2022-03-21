'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class medicos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    medicos.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        license: DataTypes.STRING,
        phone: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'medicos',
        timestamps: false
    });
    return medicos;
};