'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CampaignCharacters', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 1,
      CharacterId: 1
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CampaignCharacters', null, {});
  }
};
