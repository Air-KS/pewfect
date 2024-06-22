/*
  ./backend/models/userinfo.js
*/

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UsersInfo extends Model {
    static associate(models) {
      UsersInfo.belongsTo(models.Register, { foreignKey: 'register_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      UsersInfo.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
  }
  UsersInfo.init({
    register_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Register',
        key: 'id'
      },
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_one: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_two: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
      allowNull: false,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UsersInfo',
    tableName: 'UsersInfo',
    timestamps: true,
    underscored: true,
  });
  return UsersInfo;
};
