'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Races', [{
      name: "race",
      str_bonus: 0,
      dex_bonus: 0,
      con_bonus: 0,  
      int_bonus: 0,
      wis_bonus: 0,
      cha_bonus: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Races', null, {});
  }
};
