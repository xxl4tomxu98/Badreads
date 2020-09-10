const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { asyncHandler } = require('../utils.js');
const { Book } = require('../db/models');


const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('search.pug')
// })

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
    console.log(books);
  } catch (err) {
    console.log(err);
  }
  } else {
    books = await Book.findAll({
      limit: 10,
      order: [['title', 'ASC']]
    })
  }
  // console.log(books);
  res.render('search', { books });

}))


module.exports = router;
