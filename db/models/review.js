'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: 'user_id'});
    Review.belongsTo(models.Book, {foreignKey: 'book_id'});
  };
  return Review;
};
