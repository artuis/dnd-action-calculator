module.exports = function(sequelize, DataTypes) {
  var Race = sequelize.define("Race", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    str_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        gte: 0
      },
      defaultValue: 0
    },
    dex_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        gte: 0
      },
      defaultValue: 0
    },
    con_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        gte: 0
      },
      defaultValue: 0
    },
    int_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        gte: 0
      },
      defaultValue: 0
    },
    wis_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        gte: 0
      },
      defaultValue: 0
    },
    cha_bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        gte: 0
      },
      defaultValue: 0
    }
  });

  Race.associate = function(models) {
    
    Race.hasMany(models.Character, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };

  return Race;
};
