'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      { name: 'Philosophy', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Memiors', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
