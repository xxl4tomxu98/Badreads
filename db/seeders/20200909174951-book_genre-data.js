'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Book_Genres', [
      {book_id: 1, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 2, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 3, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 4, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 5, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 6, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 7, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 8, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 9, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 10, genre_id: 3, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 11, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 12, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 13, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 14, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 15, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 16, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 17, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 18, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 19, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 20, genre_id: 1, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 21, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 22, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 23, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 24, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 25, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 26, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 27, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 28, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 29, genre_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {book_id: 30, genre_id: 2, createdAt: new Date(), updatedAt: new Date()}
    ], { }
    );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Book_Genres', null, {});

  }
};
