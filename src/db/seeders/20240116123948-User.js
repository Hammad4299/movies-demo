"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstname: "User",
                    lastname: "1",
                    email: "user1@example.com",
                    passwordHash:
                        "$2b$15$7y.hBjFItnZfABcEl/6flezgcoAdOFmrO3oGWOBrFYMNpA7qNm2qq", // Pass12345
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        queryInterface.bulkDelete("Users", null, {});
    },
};
