'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shelves', [
      {name: 'Favorites', user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Currently Reading', user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Read', user_id: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Want to Read', user_id: 2, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Shelves', null, {});
  }
};
