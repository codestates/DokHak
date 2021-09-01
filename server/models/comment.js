'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // onUpdate 확인
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'cascade',
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        targetKey: 'id',
        onDelete: 'cascade',
      });
    }
  }
  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Comment;
};
