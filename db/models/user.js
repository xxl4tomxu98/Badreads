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
    // associations can be defined here
  };
  User.prototype.validatePassword = (password) =>
    bcrypt.compareSync(password, this.hashedPassword.toString());

  return User;
};
