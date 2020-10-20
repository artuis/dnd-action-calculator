module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    desc: {
      type: DataTypes.TEXT
    }
  });

  Character.associate = function(models) {
    
    Character.belongsTo(models.Weapon);

    Character.belongsTo(models.Account);
    
    Character.belongsTo(models.Class);
    
    Character.belongsTo(models.Race);

    Character.belongsToMany(models.Campaign, {
      through: 'campaignCharacters'
    })
  };

  return Character;
};