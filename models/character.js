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
      validate: {
        len: [1]
      }
    },
    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 355000
      }
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 20
      }
    },
    strength: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    dexterity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    constitution: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    intelligence: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    wisdom: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    charisma: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    perception: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    initiative: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    hp_current: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    hp_temp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    hp_max: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    armor_class: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 99
      }
    },
    shield: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });

  Character.associate = function(models) {
    
    Character.belongsTo(models.Weapon, {
      foreignKey: {
        allowNull: true
      }
    });

    Character.belongsTo(models.Account);
    
    Character.belongsTo(models.Class);
    
    Character.belongsTo(models.Race);

    Character.belongsToMany(models.Campaign, {
      through: 'campaignCharacters'
    })
  };

  return Character;
};