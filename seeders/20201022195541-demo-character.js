'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [{
      name: "Character",
      player_name: "Player",
      experience: 0,
      level: 1,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      perception: 0,
      initiative: 0,
      hp_current: 6,
      hp_temp: 0,
      hp_max: 6,
      armor_class: 10,
      shield: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      AccountId: 1,
      WeaponId: 1,
      ClassId: 1,
      RaceId: 1
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
