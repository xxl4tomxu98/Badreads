// const { Op } = require('sequelize');
// let Book;
// let moduleError;

// try {
//   const db = require('../db/models');
//   ({ Book } = db);
//   if (Book === undefined) {
//     moduleError = 'Check your db model for Book.';
//   }
// } catch (e) {
//   console.error(e);
//   if (e.message.includes('Cannot find module')) {
//     moduleError = 'It looks like you need initialize your project.';
//   } else {
//     moduleError = `An error was raised "${e.message}". Check the console for details.`;
//   }
// }


// async function findAllBooks() {
//   return await Book.findAll({
//     limit: 10,
//     order: [['updatedAt', 'DESC']]
//   })
// }


// async function findBooksByTerm(term) {
//   return await Book.findAll({
//     where: {
//       [Op.or]: [
//         { title: { [Op.ilike]: term }},
//         { author: { [Op.ilike]: term }}
//       ]
//     },
//     order: [['title', 'DESC']]
//   });
// }


// module.exports = {
//   findAllBooks,
//   findBooksByTerm,
//   loadingDbError: moduleError,
// }
