'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('category_custom_quiz', {
            categoryId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'category', key: 'id'},
                onDelete: 'RESTRICT',
            },
            customQuizId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'custom_quiz', key: 'id'},
                onDelete: 'RESTRICT',
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
                type: Sequelize.DATE,
            }
        });
        await queryInterface.sequelize.query('ALTER TABLE "category_custom_quiz" ADD CONSTRAINT "category_custom_quiz_pkey" PRIMARY KEY ("categoryId", "customQuizId")');
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('category_custom_quiz');
    }
};
