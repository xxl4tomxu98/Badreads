'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_Genres', [
      { user_id: 2, genre_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, genre_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, genre_id: 1, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Genres', null, {});
  }
};
