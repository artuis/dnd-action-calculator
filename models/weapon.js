module.exports = function(sequelize, DataTypes) {
  var Weapon = sequelize.define("Weapon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    "1h_dmg": {
      type: DataTypes.STRING,
      defaultValue: null
    },
    "2h_dmg": {
      type: DataTypes.STRING,
      defaultValue: null
    },
    range: {
      type: DataTypes.INTEGER,
      defaultValue: 5
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