'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books_Shelf = sequelize.define('Books_Shelf', {
    book_id: DataTypes.INTEGER,
    shelf_id: DataTypes.INTEGER
  }, {});
  Books_Shelf.associate = function(models) {
    // associations can be defined here
  };
  return Books_Shelf;
};
