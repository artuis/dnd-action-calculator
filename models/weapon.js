module.exports = function(sequelize, DataTypes) {
  var Weapon = sequelize.define("Weapon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dmg_1h: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dmg_2h: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    range: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

  });

  Weapon.associate = function(models) {
    
    Weapon.hasMany(models.Character, {
      foreignKey: {
        allowNull: true
      }
    });
    
  };

  return Weapon;
};