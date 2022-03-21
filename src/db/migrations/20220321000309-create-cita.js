'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cita', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER
            },
            date: {
                allowNull: false,
                unique: true,
                type: Sequelize.DATE
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
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cita');
    }
};