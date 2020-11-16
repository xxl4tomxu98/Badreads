const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { asyncHandler } = require('../utils');
const { Book, Genre, Review } = require('../db/models');



const router = express.Router();

//when user goes to /books with or without a search term logic
router.get('/', asyncHandler(async (req, res) => {
  const { term } = req.query;
  let books;
  if (term) {
    try {
      books = await Book.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${term}%` } },
            { author: { [Op.iLike]: `%${term}%` } }
          ]
        },
        order: [['title', 'ASC']]
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    books = await Book.findAll({
      limit: 10,
      order: [['title', 'ASC']]
    })
  }
  console.log(books);
  const searchTitle = `Search result for "${term}"`
  res.render('searchpage', { books, searchTitle });

}))

//when user goes to /books/bookid
router.get('/:bookid(\\d+)', asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.bookid, 10)

  //weird querying for ordering join tables, only works with double square brackets for some reason
  const book = await Book.findByPk(bookId, {
    include: [{ model: Genre }, { model: Review }],
    order: [[Review, 'createdAt', 'DESC']]
  })

  // const user = req.user

  // const shelves = await Shelf.findAll({
  //   where: {
  //     user_id: user.id
  //   }
  // })

  res.render('bookpage', {
    book
  }
  )

}))

module.exports = router;
