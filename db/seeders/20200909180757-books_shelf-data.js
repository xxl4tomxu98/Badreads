'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books_Shelves', [
      {book_id: 1, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 2, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 3, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 4, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 5, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 6, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 7, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 8, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 9, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 10, shelf_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 11, shelf_id: 4, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 12, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 13, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 14, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 15, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 16, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 17, shelf_id: 4, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 18, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 19, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 20, shelf_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 21, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 22, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 23, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 24, shelf_id: 4, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 25, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 26, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 27, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 28, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 29, shelf_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 30, shelf_id: 4, createdAt: new Date(), updatedAt: new Date()}
    ], { }
    );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Books_Shelves', null, {});

  }
};
