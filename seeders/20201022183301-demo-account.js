'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Accounts', [{
      username : "user1",
      password: "pass2",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
