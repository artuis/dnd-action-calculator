module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    playerName: {
      type:DataTypes.STRING,
    },
    experience: {
      type: DataTypes.INTEGER
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    strength: {
      type: DataTypes.INTEGER
    },
    dexterity: {
      type: DataTypes.INTEGER
    },
    constitution: {
      type: DataTypes.INTEGER
    },
    intelligence: {
      type: DataTypes.INTEGER
    },
    wisdom: {
      type: DataTypes.INTEGER
    },
    charisma: {
      type: DataTypes.INTEGER
    },
    perception: {
      type: DataTypes.INTEGER
    },
    initiative: {
      type: DataTypes.INTEGER
    },
    hp_current: {
      type: DataTypes.INTEGER
    },
    hp_temp: {
      type: DataTypes.INTEGER
    },
    hp_max: {
      type: DataTypes.INTEGER
    },
    armor_class: {
      type: DataTypes.INTEGER
    },
    shield: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
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