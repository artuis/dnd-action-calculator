'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CampaignCharacters', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 1,
      CharacterId: 1
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 1,
      CharacterId: 2
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 1,
      CharacterId: 3
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 1,
      CharacterId: 4
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 2,
      CharacterId: 4
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 2,
      CharacterId: 5
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 3,
      CharacterId: 1
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 3,
      CharacterId: 3
    },{
      createdAt: new Date(),
      updatedAt: new Date(),
      CampaignId: 3,
      CharacterId: 5
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CampaignCharacters', null, {});
  }
};
