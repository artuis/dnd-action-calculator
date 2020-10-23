module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    player_name: {
      type:DataTypes.STRING,
    },
    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    strength: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dexterity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    constitution: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    intelligence: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    wisdom: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    charisma: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    perception: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    initiative: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    hp_current: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    hp_temp: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    hp_max: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    armor_class: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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