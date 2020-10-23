'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Weapons', [{
      name: "Club",
      category: "melee",
      "1h_dmg": "1d8",
      "2h_dmg": "1d8",
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Weapons', null, {});
  }
};
