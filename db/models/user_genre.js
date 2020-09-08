'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Genre = sequelize.define('User_Genre', {
    user_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {});
  User_Genre.associate = function(models) {
    // associations can be defined here
  };
  return User_Genre;
};
