'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    publicationYear: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Book.associate = function(models) {
    const columnMapping = {
      through: 'Books_Shelf',
      otherKey: 'shelf_id',
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    };
    Book.belongsToMany(models.Shelf, columnMapping);
    const columnMapping1 = {
      through: 'Book_Genre',
      otherKey: 'genre_id',
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    };
    Book.belongsToMany(models.Genre, columnMapping1);
    Book.hasMany(models.Review, {foreignKey: 'book_id'});
  };
  return Book;
};
