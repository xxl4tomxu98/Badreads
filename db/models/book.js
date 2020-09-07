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
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
