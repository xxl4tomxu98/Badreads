'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shelf = sequelize.define('Shelf', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Shelf.associate = function(models) {
    const columnMapping = {
      through: 'Books_Shelf',
      otherKey: 'book_id',
      foreignKey: 'shelf_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    };
    Shelf.belongsToMany(models.Book, columnMapping);
    Shelf.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return Shelf;
};
