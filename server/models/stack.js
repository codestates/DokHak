'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Stack.belongsToMany(models.User, {
        through: 'user_stack',
      });
      models.Stack.belongsToMany(models.Post, {
        through: 'post_stack',
      });
    }
  }
  Stack.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Stack',
    }
  );
  return Stack;
};
