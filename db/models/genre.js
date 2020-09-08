'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    const columnMapping = {
      through: 'User_Genre',
      otherKey: 'user_id',
      foreignKey: 'genre_id'
    };
    Genre.belongsToMany(models.User, columnMapping);
    const columnMapping1 = {
      through: 'Book_Genre',
      otherKey: 'book_id',
      foreignKey: 'genre_id'
    };
    Genre.belongsToMany(models.Book, columnMapping1);
  };
  return Genre;
};
