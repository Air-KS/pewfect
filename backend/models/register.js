/*
  ./backend/models/register.js
*/

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Register extends Model {
    static associate(models) {
      Register.belongsTo(models.Role, { foreignKey: 'role_id' });
      Register.hasMany(models.UsersInfo, { foreignKey: 'register_id' });
    }
  }
  Register.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
      allowNull: false,
      defaultValue: 1 // Par défaut, 'client'
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
    modelName: 'Register',
    tableName: 'Register',
    timestamps: true,
    underscored: true,
  });
  return Register;
};
