'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'cascade',
      });
      models.Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        sourceKey: 'id',
        onDelete: 'cascade',
      });
      models.Post.belongsToMany(models.Stack, {
        through: 'post_stack',
      });
    }
  }
  Post.init(
    {
      image: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Post;
};
