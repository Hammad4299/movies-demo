"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return queryInterface.addColumn(
            "movies", // name of Source model
            "userId", // name of the key we're adding
            {
                type: Sequelize.UUID,
                references: {
                    model: "users", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
                onDelete: "CASCADE",
            }
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        return queryInterface.removeColumn(
            "movies", // name of Source model
            "userId" // key we want to remove
        );
    },
};
