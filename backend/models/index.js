/*
  backend/models/index.js
*/

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Synchroniser les associations
db.Register.hasOne(db.UsersInfo, { foreignKey: 'register_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.UsersInfo.belongsTo(db.Register, { foreignKey: 'register_id' });
db.Role.hasMany(db.UsersInfo, { foreignKey: 'role_id' });
db.UsersInfo.belongsTo(db.Role, { foreignKey: 'role_id' });
db.Role.hasMany(db.Register, { foreignKey: 'role_id' });
db.Register.belongsTo(db.Role, { foreignKey: 'role_id' });

// Synchroniser la base de données
sequelize.sync({ logging: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
