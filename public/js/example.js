//const { Op } = require('sequelize');
// const sequelize = require('sequelize');
// const Op = sequelize.Op;

// const { Book } = require('../../db/models');

// const searchBar = document.getElementById('searchBar');


// searchBar.addEventListener('submit', event => {
//   //const searchString = event.target.value;
//   const searchString = req.query.term

//   const filteredBooks = async function bookSearch() {
//     return await Book.findAll({
//       where: {
//         [Op.or]: [
//           { title: { [Op.ilike]: searchString } },
//           { author: { [Op.ilike]: searchString } }
//         ]
//       },
//       order: [['title', 'DESC']]
//     });
//   };

//   displayBooks(filteredBooks);
//   console.log(searchString);
// });

// const booksList = document.getElementById('booksList');
// let books = [];

// const loadBooks = async () => {
//   try {
//     const res = await fetch('http://localhost:8080/books');
//     books = await res.json();
//     displayBooks(books);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const displayBooks = (books) => {
//   const htmlString = books
//     .map((book) => {
//       return `
//             <li class="book">
//                 <h2>${book.title}</h2>
//                 <p>Author: ${book.author}</p>
//                 <img src="/book-images/${book.id}"></img>
//             </li>
//         `;
//     })
//     .join('');
//   booksList.innerHTML = htmlString;
// };

// loadBooks();
