module.exports = function(sequelize, DataTypes) {
    var Calculator = sequelize.define("Calculator", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Calculator.associate = function(models) {
      
      Calculator.belongsTo(models.Campaign, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Calculator;
  };
  