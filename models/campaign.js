module.exports = function(sequelize, DataTypes) {
  var Campaign = sequelize.define("Campaign", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Campaign.associate = function(models) {
    
    Campaign.belongsToMany(models.Character, {
      through: 'campaignCharacters'
    });

    Campaign.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false
      }
    })

  };
  return Campaign;
};
