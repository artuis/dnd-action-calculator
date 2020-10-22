module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Account.associate = function(models) {
    
    Account.hasMany(models.Character, {
      foreignKey: {
        allowNull: false
      }
    });

    Account.hasMany(models.Campaign);

  };
  return Account;
};
