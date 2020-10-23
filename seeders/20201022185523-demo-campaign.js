'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Campaigns', [{
      name: "exampleCampaign1",
      AccountId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "exampleCampaign2",
      AccountId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "exampleCampaign3",
      AccountId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "exampleCampaign4",
      AccountId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Campaigns', null, {});
  }
};
