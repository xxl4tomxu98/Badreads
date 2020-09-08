'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book_Genre = sequelize.define('Book_Genre', {
    book_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {});
  Book_Genre.associate = function(models) {
    // associations can be defined here
  };
  return Book_Genre;
};