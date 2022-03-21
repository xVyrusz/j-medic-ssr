const { DataTypes } = require('sequelize');

'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('consulta', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER
            },
            dateVisit: {
                allowNull: false,
                defaultValue: DataTypes.NOW,
                type: Sequelize.DATE
            },
            nameReason: {
                allowNull: false,
                type: Sequelize.STRING
            },
            testMade: {
                allowNull: false,
                type: Sequelize.STRING
            },
            diagnosis: {
                allowNull: false,
                type: Sequelize.STRING
            },
            treatment: {
                allowNull: false,
                type: Sequelize.STRING
            },
            idDoctor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'medicos',
                    key: 'id'
                }
            },
            idPatient: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'pacientes',
                    key: 'id'
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('consulta');
    }
};