'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            username: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING(191),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            passwordResetToken: {
                type: Sequelize.STRING,
                unique: true,
            },
            lastResetPasswordEmailSendDate: {
                type: Sequelize.DATE,
            },
            plan: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            role: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            isTrustyWriter: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            isBanned: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            unbanDate: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            }
        });
        await queryInterface.addIndex('user', ['username']);
        await queryInterface.addIndex('user', ['email']);
        await queryInterface.addIndex('user', ['plan']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user');
    }
};
