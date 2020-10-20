module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define("Class", {
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
  

  Class.associate = function(models) {
    
    Class.hasMany(models.Character, {
      foreignKey: {
        allowNull: false
      }
    });

    Class.belongsToMany(models.Spell, {
      through: 'classSpells'
    });
    
  };

  return Class;
};
