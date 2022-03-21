'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class consulta extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    consulta.init({
        dateVisit: DataTypes.DATE,
        nameReason: DataTypes.STRING,
        testMade: DataTypes.STRING,
        diagnosis: DataTypes.STRING,
        treatment: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'consulta',
        timestamps: false
    });
    return consulta;
};