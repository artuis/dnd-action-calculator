module.exports = function(sequelize, DataTypes) {
  var Spell = sequelize.define("Spell", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    desc: {
      type: DataTypes.TEXT
    },
    school: {
      type: DataTypes.STRING
    },
    dmg_slot_1: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_2: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_3: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_4: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_5: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_6: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_7: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_8: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dmg_slot_9: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  });

  Spell.associate = function(models) {
    
    Spell.belongsToMany(models.Class, {
      through: 'classSpells'
    });
    
  };

  return Spell;
};