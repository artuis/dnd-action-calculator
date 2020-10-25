const bcrypt = require("bcrypt")

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        isEmail: true
      },
      unique:true
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
      },
      onDelete:"cascade"
    });

    Account.hasMany(models.Campaign, {
      foreignKey: {
        allowNull: false
      },
      onDelete:"cascade"
    });

  };

  Account.beforeCreate(function(account){
    account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync(10),null);
  })

  return Account;
};
