'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      { name: 'Biography', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Children', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fantasy', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Historical', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Horror', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Humor', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Inspirational', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Literary', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Memoirs', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Motivational', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mystery', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Romance', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Self-Help', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Travel', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Western', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Women\'s', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
