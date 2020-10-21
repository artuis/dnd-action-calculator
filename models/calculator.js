module.exports = function(sequelize, DataTypes) {
    var Calculator = sequelize.define("Calculator", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Calculator.associate = function(models) {
      
      Calculator(models.Character, {
        through: 'CalculatorCharacters'
      });
  
      Calculator.belongsTo(models.Account, {
        foreignKey: {
          allowNull: false
        }
      })
  
    };
    return Calculator;
  };
  