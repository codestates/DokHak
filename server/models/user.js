'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'cascade',
      });
      models.User.hasMany(models.Comment, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'cascade',
      });
      models.User.belongsToMany(models.Stack, {
        through: 'user_stack',
      });
    }
  }
  User.init(
    {
      image: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider: {
        // 깃헙이면 이메일만검사, 독학이면 이메일, 네임 검사
        type: DataTypes.STRING,
        allowNull: false,
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return User;
};
