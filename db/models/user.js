'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    }
  }, {});
  User.associate = function(models) {
    const columnMapping = {
      through: 'User_Genre',
      otherKey: 'genre_id',
      foreignKey: 'user_id'
    };
    User.belongsToMany(models.Genre, columnMapping);
    User.hasMany(models.Shelf, {foreignKey: 'user_id'});
    User.hasMany(models.Review, {foreignKey: 'user_id'});
  };
  User.prototype.validatePassword = function (password){
    return bcrypt.compareSync(password, this.hashedPassword.toString())
  }

  return User;
};
